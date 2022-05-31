import { db } from "../models/db.js";

export const productController = {
  getProducts: async (req, res) => {
    const recentProductList = await db.getRecent30ProductList();
    res.render("main.pug", {
      userId: req.session.userId,
      productList: recentProductList,
    });
  },
  getProductsByKeyword: async (req, res) => {
    const { keyword } = req.query;
    const productListByKeyword = await db.getProductListWithConditions(keyword);
    res.render("main.pug", {
      userId: req.session.userId,
      productList: productListByKeyword,
    });
  },
  getUserWishList: async (req, res) => {
    const wishList = await db.getUserWishList(req.session.userId);
    res.render("main.pug", {
      userId: req.session.userId,
      productList: wishList,
    });
  },
};
