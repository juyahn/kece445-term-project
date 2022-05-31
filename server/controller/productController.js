import { db } from "../models/db.js";

export const productController = {
  getProducts: async (req, res) => {
    const recentProductList = await db.getRecent30ProductList();
    res.render("main.pug", { userId: req.session.userId, recentProductList });
  },
};
