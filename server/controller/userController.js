import { db } from "../models/db.js";

export const userController = {
  getUsers: async (req, res) => {
    const userList = await db.getUserList();
    res.send(userList);
  },
  renderSignUp: (req, res) => {
    res.render("signup.pug");
  },
  renderSignIn: (req, res) => {
    res.render("signin.pug");
  },
  addUser: async (req, res) => {
    const { id } = req.body;
    const existingUser = await db.getUser(id);
    if (existingUser.length != 0) {
      res.send(
        JSON.stringify({ text: "이미 존재하는 id 입니다.", success: false })
      );
    } else {
      await db.addUsers(req.body);
      res.send(
        JSON.stringify({ text: "회원가입이 완료되었습니다.", success: true })
      );
    }
  },
};
