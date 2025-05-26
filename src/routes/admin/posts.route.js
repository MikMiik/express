const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/admin/posts.controller");

router.get("/", postsController.index);
router.get("/:post/edit", postsController.edit);
router.get("/:id", postsController.show);
router.get("/create", postsController.create);

module.exports = router;
