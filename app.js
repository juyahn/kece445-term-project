import createError from "http-errors";
import express from "express";
import path from "path";
import { router } from "./index.js";
import session from "express-session";

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "server/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "2018171034AJY",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/", router);

app.listen(port, () => console.log(`listening on port ${port}`));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(createError(404));
});
app.use((err, req, res, next) => console.log(err.message));
