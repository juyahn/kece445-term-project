import express from "express";
import { productRouter } from "./server/routes/productRouter.js";

const router = express.Router();
router.use("/", productRouter);

export { router };
