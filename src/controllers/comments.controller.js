const commentsService = require("@/services/comments.service");
const response = require("@/utils/response");

exports.getList = async (req, res) => {
  const comments = await commentsService.getAll();
  response.success(res, 200, comments);
};

exports.getOne = async (req, res) => {
  response.success(res, 200, req.comment);
};

exports.create = async (req, res) => {
  const comment = await commentsService.create(req.body);
  response.success(res, 201, comment);
};

exports.update = async (req, res) => {
  const comment = await commentsService.update(req.comment.id, req.body);
  response.success(res, 200, comment);
};

exports.remove = async (req, res) => {
  await commentsService.remove(req.comment.id);
  response.success(res, 204);
};
