const express = require("express");
const postsController = require("@/controllers/admin/posts.controller");
const router = express.Router();

router.get("/", postsController.index);
router.get("/:id", postsController.show);

module.exports = router;
