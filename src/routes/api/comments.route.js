const express = require("express");
const router = express.Router();

const commentsValidator = require("../../validators/comments.validator.js");
const commentsController = require("@/controllers/api/comments.controller.js");
const attachResourceLoaders = require("@/utils/attachResourceLoaders.js");

attachResourceLoaders(router, ["comment"]);

router.get("/", commentsController.getList);
router.get("/:comment", commentsController.getOne);
router.post(
  "/",
  commentsValidator.createCommentValidator,
  commentsController.create
);
router.put(
  "/:comment",
  commentsValidator.updateCommentValidator,
  commentsController.update
);
router.patch(
  "/:comment",
  commentsValidator.updateCommentValidator,
  commentsController.update
);
router.delete("/:comment", commentsController.remove);

module.exports = router;
