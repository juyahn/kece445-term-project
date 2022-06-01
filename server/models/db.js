import mysql from "mysql2/promise";
import dotenv from "dotenv";

class database {
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PSSWD,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_NAME,
    });
  }
  async getUserList() {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query("SELECT * FROM users");
    connection.release();
    return rows;
  }
  async getUser(userId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM users where id='${userId}'`
    );
    connection.release();
    return rows;
  }
  async checkUserLogin(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM users where id='${data.id}' and password='${data.password}'`
    );
    connection.release();
    return rows.length > 0;
  }
  async getRecent30ProductList() {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE is_sold IS FALSE ORDER BY id DESC LIMIT 30"
    );
    connection.release();
    return rows;
  }
  async getProductListWithConditions(text) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM products WHERE name LIKE '%${text}%' OR explanation LIKE '%${text}%' ORDER BY id DESC`
    );
    connection.release();
    return rows;
  }
  async getUserWishList(userId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM products INNER JOIN wish_lists ON id=PRODUCT_id WHERE wish_lists.USER_id='${userId}'`
    );
    connection.release();
    return rows;
  }
  async getProduct(productId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM products WHERE id='${productId}'`
    );
    connection.release();
    return rows;
  }
  async getProductCommentList(productId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const [rows] = await connection.query(
      `SELECT * FROM comments WHERE PRODUCT_id='${productId}'`
    );
    connection.release();
    return rows;
  }
  async addUsers(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    INSERT INTO users(id, password)
    VALUES ('${data.id}','${data.password}')
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async addProducts(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    INSERT INTO products(name,explanation,price,USER_id)
    VALUES ('${data.name}','${data.explanation}',${data.price},${data.userId})
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async addComments(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    INSERT INTO comments(USER_id, PRODUCT_id, comment)
    VALUES (${data.userId},${data.productId},'${data.comment}')
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async addWishLists(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    INSERT INTO wish_lists(USER_id, PRODUCT_id))
    VALUES ('${data.userId}','${data.productId}')
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async deleteProducts(productId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    DELETE FROM products
    WHERE id=${productId}
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async deleteComments(commentId) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    DELETE FROM comments
    WHERE id=${commentId}
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async deleteWishLists(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
    DELETE FROM wish_lists
    WHERE USER_id='${data.userId}' AND PRODUCT_id=${data.productId}
    `;
    await connection.query(query);
    connection.release();
    return;
  }
  async updateProducts(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
        UPDATE products
        SET name='${data.name}', explanation='${data.explanation}', price=${data.price}
        WHERE id = ${data.productId}
        `;
    await connection.query(query);
    connection.release();
    return;
  }
  async updateProductIsSold(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
        UPDATE products
        SET id_sold=${data.isSold}
        WHERE id = ${data.productId}
        `;
    await connection.query(query);
    connection.release();
    return;
  }
  async updateComments(data) {
    const connection = await this.pool.getConnection(async (con) => con);
    const query = `
        UPDATE comments
        SET comment='${data.comment}'
        WHERE id = ${data.commentId}
        `;
    await connection.query(query);
    connection.release();
    return;
  }
}

export const db = new database();
