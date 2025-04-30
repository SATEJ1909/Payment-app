import express from 'express';
import dotenv from 'dotenv';
const app = express();
import cors from 'cors';
import UserRouter from './routes/user';
import AccountRouter from './routes/account';
import mongoose from 'mongoose';

app.use(express.json());
app.use(cors());

app.use("/api/v1/user" , UserRouter);
app.use("/api/v1/account" , AccountRouter);
async function main(){
  await mongoose.connect("mongodb+srv://satejniswade:satej123@cluster0.qb1hk.mongodb.net/paytm");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} 

main();