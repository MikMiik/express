const express = require("express");
const {
  createCommentValidator,
  updateCommentValidator,
} = require("../validation/comments.validator.js");

const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/comments.controller");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", createCommentValidator, store);
router.put("/:id", updateCommentValidator, update);
router.patch("/:id", updateCommentValidator, update);
router.delete("/:id", destroy);

module.exports = router;
