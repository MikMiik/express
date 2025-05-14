const express = require("express");
const {
  createCommentValidator,
  updateCommentValidator,
} = require("../validators/comments.validator.js");

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
router.post("/", createCommentValidator, createComment);
router.put("/:id", updateCommentValidator, updateComment);
router.patch("/:id", updateCommentValidator, updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
