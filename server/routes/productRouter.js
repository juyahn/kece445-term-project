import express from "express";
import { productController } from "../controller/productController.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProducts);

export { productRouter };
