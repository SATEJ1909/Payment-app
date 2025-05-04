import express from 'express';
import dotenv from 'dotenv';
require('dotenv').config();
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
  await mongoose.connect( process.env.MONGO_URL as string );
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
} 

main();