import express from "express";
import { productController } from "../controller/productController.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/product/search", productController.getProductsByKeyword);
productRouter.get("/product/wishes", productController.getUserWishList);
productRouter.get("/product/detail", productController.getProductDetail);
productRouter.post("/product/comment", productController.addProductComment);
productRouter.get("/product/new", productController.newProduct);
productRouter.post("/product/new", productController.addNewProduct);

export { productRouter };
