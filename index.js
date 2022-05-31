import express from "express";
import { productRouter } from "./server/routes/productRouter.js";
import { userRouter } from "./server/routes/userRouter.js";

const router = express.Router();

router.use("/", productRouter);
router.use("/user", userRouter);

export { router };
