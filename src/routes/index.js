const express = require("express");
const router = express.Router();

const productRouter = require("./products.route");
const commentRouter = require("./comments.route");
const categoryRouter = require("./categories.route");
const todoRouter = require("./todos.route");

router.use("/products", productRouter);
router.use("/comments", commentRouter);
router.use("/categories", categoryRouter);
router.use("/todos", todoRouter);

module.exports = router;
