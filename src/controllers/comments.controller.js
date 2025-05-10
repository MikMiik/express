const commentService = require("@/services/comments.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const getAllComments = async (req, res) => {
  const comments = await commentService.getAllComments("comments");
  if (!comments) throwError(404, "Comment not found");
  response.success(res, 200, comments);
};

const getCommentById = async (req, res) => {
  const comment = await commentService.getCommentById(req.params.id);
  if (!comment) throwError(404, "Comment not found");
  response.success(res, 200, comment);
};

const createComment = async (req, res) => {
  const newComment = await commentService.createComment(req.body);
  response.success(res, 201, newComment);
};

const updateComment = async (req, res) => {
  const updatedItem = await commentService.updateComment(req.params.id, req.body);
  if (!updatedItem) throwError(404, "Comment not found");
  response.success(res, 200, updatedItem);
};

const deleteComment = async (req, res) => {
  const result = await commentService.deleteComment(req.params.id);
  if (!result) throwError(404, "Comment not found");
  res.status(200).send();
};

module.exports = { getAllComments, getCommentById, createComment, updateComment, deleteComment };
