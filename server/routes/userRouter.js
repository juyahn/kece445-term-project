import express from "express";
import { userController } from "../controller/userController.js";
const userRouter = express.Router();

userRouter.get("/", userController.getUsers);
userRouter.get("/signup", userController.renderSignUp);
userRouter.post("/signup", userController.addUser);
userRouter.get("/signin", userController.renderSignIn);
userRouter.post("/signin", userController.checkUser);
userRouter.get("/logout", (req, res) => {
  delete req.session.userId;
  return req.session.save(() => res.redirect("/"));
});

export { userRouter };
