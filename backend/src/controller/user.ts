import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";
import { UserModel } from "../models/db";
import { AccountModel } from "../models/db";
import { JWT_SECRET } from "../config";



export const signup = async (req: Request, res: Response) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(4).max(20),
        firstName: z.string().min(4).max(20),
        lastName: z.string().min(4).max(20),
    });
    if (!userSchema.safeParse(req.body).success) {
        return res.status(400).json({ error: "Invalid data" });
    }
    try {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        const userId = newUser._id;

        const balance = Math.floor(Math.random() * 10000) + 1;

        await AccountModel.create({
            userId: newUser._id,
            balance: balance,
        });

        const token = jwt.sign({
            userId: userId,
        }, JWT_SECRET)
        return res.status(201).json({ message: "User created successfully", token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;


        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid  password" });
        }
        if (user) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            res.json({
                token
            })

        } else {
            return res.status(400).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });

    }
};

export const me = async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, password } = req.body;
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getBulk = async (req: Request, res: Response) => {
    try {
        const filter = (req.query.filter as string) || "";

        const users = await UserModel.find({
            $or: [
                { firstName: { $regex: filter, $options: "i" } },  
                { lastName: { $regex: filter, $options: "i" } }
            ]
        });

        res.json({
            user: users.map(user => ({
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }))
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
