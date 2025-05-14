const express = require("express");
const commentsValidator = require("../validators/comments.validator.js");

const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments.controller");
const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.post("/", commentsValidator.createCommentValidator, createComment);
router.put("/:id", commentsValidator.updateCommentValidator, updateComment);
router.patch("/:id", commentsValidator.updateCommentValidator, updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
