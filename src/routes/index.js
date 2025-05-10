const express = require("express");
const router = express.Router();

const productRouter = require("./products.route");
const categoryRouter = require("./categories.route");
const todoRouter = require("./todos.route");
const postRouter = require("./posts.route");
const commentRouter = require("./comments.route");


router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/todos", todoRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRouter);


module.exports = router;
