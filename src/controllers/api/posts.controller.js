const postsService = require("@/services/posts.service");
const commentsService = require("@/services/comments.service");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
  const result = await postsService.getAll(req.page, req.limit);
  if (!result) throw404();
  res.paginate(result);
};

exports.getOne = async (req, res) => {
  const comments = await commentsService.getByPostId(req.post.id);
  const data = {
    ...req.post,
    comments,
  };
  res.success(200, data);
};

exports.create = async (req, res) => {
  const post = await postsService.create(req.body);
  res.success(201, post);
};

exports.update = async (req, res) => {
  const post = await postsService.update(req.post.id, req.body);
  res.success(200, post);
};

exports.remove = async (req, res) => {
  await postsService.remove(req.post.id);
  res.success(204);
};

exports.getPostComments = async (req, res) => {
  const comments = await commentsService.getByPostId(req.post.id);
  res.success(200, comments);
};

exports.createPostComments = async (req, res) => {
  const comment = await commentsService.create({
    post_id: req.post.id,
    content: req.body.content,
  });
  res.success(200, comment);
};
