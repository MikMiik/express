const commentsService = require("@/services/comments.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

const getAllComments = async (req, res) => {
  const comments = await commentsService.getAllComments("comments");
  if (!comments) throw404();
  response.success(res, 200, comments);
};

const getCommentById = async (req, res) => {
  const comment = await commentsService.getCommentById(req.params.id);
  if (!comment) throw404();
  response.success(res, 200, comment);
};

const createComment = async (req, res) => {
  const newComment = await commentsService.createComment(req.body);
  response.success(res, 201, newComment);
};

const updateComment = async (req, res) => {
  const updatedItem = await commentsService.updateComment(
    req.params.id,
    req.body
  );
  if (!updatedItem) throw404();
  response.success(res, 200, updatedItem);
};

const deleteComment = async (req, res) => {
  const result = await commentsService.deleteComment(req.params.id);
  if (!result) throw404();
  res.status(200).send();
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
