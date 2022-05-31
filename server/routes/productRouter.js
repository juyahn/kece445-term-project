import express from "express";
import { productController } from "../controller/productController.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/product/search", productController.getProductsByKeyword);
productRouter.get("/product/wishes", productController.getUserWishList);

export { productRouter };
