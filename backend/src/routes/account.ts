import { getBalance , transferMoney } from "../controller/account";
import { userMiddleware } from "../middleware/user";
import { Router } from "express";
const AccountRouter = Router();

//@ts-ignore
AccountRouter.get("/balance", userMiddleware, getBalance);
//@ts-ignore
AccountRouter.post("/transfer", userMiddleware, transferMoney);

export default AccountRouter;