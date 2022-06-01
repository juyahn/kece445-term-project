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
  getProductDetail: async (req, res) => {
    const { id } = req.query;
    const productDetail = await db.getProduct(id);
    const productComment = await db.getProductCommentList(id);
    res.render("product.pug", {
      userId: req.session.userId,
      productDetail,
      productComment,
    });
  },
  addProductComment: async (req, res) => {
    await db.addComments(req.body);
    res.send(JSON.stringify({ text: "댓글 등록", success: true }));
  },
  newProduct: async (req, res) => {
    res.render("new.pug", {
      userId: req.session.userId,
    });
  },
  addNewProduct: async (req, res) => {
    await db.addProducts(req.body);
    res.send(
      JSON.stringify({ text: "상품등록이 완료되었습니다.", success: true })
    );
  },
};
