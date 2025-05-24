const express = require("express");
const router = express.Router();

const commentsController = require("@/controllers/admin/comments.controller");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");

attachResourceLoaders(router, ["comment"]);
// Posts
router.get("/", commentsController.index);
router.get("/:comment", commentsController.show);

module.exports = router;
