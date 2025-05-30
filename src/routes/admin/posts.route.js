const express = require("express");
const router = express.Router();

const postsController = require("@/controllers/admin/posts.controller");

router.get("/", postsController.index);
router.get("/:id/edit", postsController.edit);
router.get("/create", postsController.create);
router.get("/:id", postsController.show);

module.exports = router;
