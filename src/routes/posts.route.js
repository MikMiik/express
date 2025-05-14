const express = require("express");

const postsController = require("@/controllers/posts.controller");
const postsValidator = require("@/validators/posts.validator");
const router = express.Router();

// Posts
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post(
  "/",
  postsValidator.createPostValidator,
  postsController.createPost
);
router.put("/:id", postsController.updatePost);
router.patch("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

// Posts comments
router.get("/:id/comments", postsController.getPostComments);
router.post("/:id/comments", postsController.createPostComments);

module.exports = router;
