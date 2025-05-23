const commentsService = require("@/services/comments.service");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
  const result = await commentsService.getAll(req.page, req.limit);
  if (!result) throw404();
  res.paginate(result);
};

exports.getOne = async (req, res) => {
  res.success(200, req.comment);
};

exports.create = async (req, res) => {
  const comment = await commentsService.create(req.body);
  res.success(201, comment);
};

exports.update = async (req, res) => {
  const comment = await commentsService.update(req.comment.id, req.body);
  res.success(200, comment);
};

exports.remove = async (req, res) => {
  await commentsService.remove(req.comment.id);
  res.success(204);
};
