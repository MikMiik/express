const express = require("express");
const router = express.Router();

const productRouter = require("./products.route");
const commentRouter = require("./comments.route");

router.use("/products", productRouter);
router.use("/comments", commentRouter);

module.exports = router;
