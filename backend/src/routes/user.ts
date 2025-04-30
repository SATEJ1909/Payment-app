import { signup, login  , updateProfile, getBulk, me} from "../controller/user";
import { userMiddleware } from "../middleware/user";
import { Router } from "express";

const UserRouter = Router();

//@ts-ignore
UserRouter.post("/signup", signup);
//@ts-ignore
UserRouter.post("/login", login);

//@ts-ignore
UserRouter.get("/me" , userMiddleware , me);

//@ts-ignore
UserRouter.put("/updateProfile", userMiddleware, updateProfile);
// @ts-ignore
UserRouter.get("/bulk" , getBulk);


export default UserRouter;

