const express = require("express");
const router = express.Router();

const productsRouter = require("./products.route");
const categoriresRouter = require("./categories.route");
const todosRouter = require("./todos.route");
const postsRouter = require("./posts.route");
const commentsRouter = require("./comments.route");
const usersRouter = require("./users.route");

router.use("/products", productsRouter);
router.use("/categories", categoriresRouter);
router.use("/todos", todosRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/users", usersRouter);

module.exports = router;
