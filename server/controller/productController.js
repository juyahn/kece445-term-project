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
  addUserWishList: async (req, res) => {
    await db.addWishLists(req.body);
    res.send(
      JSON.stringify({ text: "찜한 상품에 추가했습니다.", success: true })
    );
  },
  deleteUserWishList: async (req, res) => {
    await db.deleteWishLists(req.body);
    res.send(JSON.stringify({ text: "찜에서 삭제되었습니다.", success: true }));
  },
  getUserProduct: async (req, res) => {
    const userProductList = await db.getUserProduct(req.session.userId);
    res.render("main.pug", {
      userId: req.session.userId,
      productList: userProductList,
    });
  },
  getProductDetail: async (req, res) => {
    const { id } = req.query;
    const productDetail = await db.getProduct(id);
    const productComment = await db.getProductCommentList(id);
    let userWishProduct = await db.checkUserWishProduct({
      userId: req.session.userId,
      productId: id,
    });
    res.render("product.pug", {
      userId: req.session.userId,
      userWishProduct,
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
  updateProductSelling: async (req, res) => {
    await db.updateProductIsSold(req.body);
    res.send(
      JSON.stringify({
        text:
          req.body.isSold == "1"
            ? "상품이 다시 판매됩니다."
            : "상품이 판매 완료 처리 되었습니다.",
        success: true,
      })
    );
  },
  deleteProduct: async (req, res) => {
    await db.deleteProducts(req.body?.productId);
    res.send(
      JSON.stringify({ text: "상품이 삭제되었습니다..", success: true })
    );
  },
};
