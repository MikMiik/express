const usersService = require("@/services/users.service");
const commentsService = require("@/services/comments.service");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
  const result = await usersService.getAll(req.page, req.limit);
  if (!result) throw404();
  res.paginate(result);
};

exports.getOne = async (req, res) => {
  res.success(200, req.user);
};

exports.create = async (req, res) => {
  const user = await usersService.create(req.body);
  res.success(201, user);
};

exports.update = async (req, res) => {
  const user = await usersService.update(req.user.id, req.body);
  res.success(200, user);
};

exports.remove = async (req, res) => {
  await usersService.remove(req.user.id);
  res.success(204);
};

exports.getUserComments = async (req, res) => {
  const comments = await commentsService.getByUserId(req.user.id);
  res.success(200, comments);
};
