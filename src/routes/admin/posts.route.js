const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/admin/posts.controller");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");

attachResourceLoaders(router, ["post"]);
// Posts
router.get("/", postsController.index);
router.get("/:post/edit", postsController.edit);
router.get("/:post", postsController.show);
router.get("/create", postsController.create);

module.exports = router;
