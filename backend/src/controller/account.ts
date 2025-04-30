
import { Request, Response } from "express";
import mongoose from "mongoose";
// @ts-ignore
import { AccountModel } from "../model/db";



export const getBalance = async (req: Request, res: Response) => {
    try {
        const account = await AccountModel.findOne({ userId : req.userId });
        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }
        return res.status(200).json({ balance: account.balance });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const transferMoney = async (req: Request, res: Response) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount , toUserId } = req.body;
       
        const account = await AccountModel.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ error: "Insufficient balance" });
        }

        const toAccount = await AccountModel.findOne({ userId: toUserId }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(404).json({ error: "Recipient account not found" });
        }
        
        await AccountModel.updateOne({
            userId: req.userId
        }, {
            $inc: { balance: -amount }
        }).session(session);

        await AccountModel.updateOne({
            userId: toUserId
        }, {
            $inc: { balance: amount }
        }).session(session);

        await session.commitTransaction();
        return res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}