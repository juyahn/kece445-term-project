import express from "express";
import { productController } from "../controller/productController.js";
const productRouter = express.Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/product/search", productController.getProductsByKeyword);
productRouter.get("/product/wishes", productController.getUserWishList);
productRouter.post("/product/wishes", productController.addUserWishList);
productRouter.delete("/product/wishes", productController.deleteUserWishList);
productRouter.get("/product/my", productController.getUserProduct);
productRouter.get("/product/detail", productController.getProductDetail);
productRouter.delete("/product/detail", productController.deleteProduct);
productRouter.post("/product/comment", productController.addProductComment);
productRouter.get("/product/new", productController.newProduct);
productRouter.post("/product/new", productController.addNewProduct);
productRouter.patch("/product/selling", productController.updateProductSelling);

export { productRouter };
