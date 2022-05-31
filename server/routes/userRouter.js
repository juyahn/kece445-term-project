import express from "express";
import { userController } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/signup", userController.renderSignUp);
userRouter.post("/signup", userController.addUser);

export { userRouter };
