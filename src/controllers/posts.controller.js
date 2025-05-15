const postsService = require("@/services/posts.service");
const commentsService = require("@/services/comments.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
  const posts = await postsService.getAll("posts");
  if (!posts) throw404();
  response.success(res, 200, posts);
};

exports.getOne = async (req, res) => {
  const comments = await commentsService.getByPostId(req.post.id);
  const data = {
    ...req.post,
    comments,
  };
  response.success(res, 200, data);
};

exports.create = async (req, res) => {
  const newPost = await postsService.create(req.body);
  response.success(res, 201, newPost);
};

exports.update = async (req, res) => {
  const updatedPost = await postsService.update(req.post.id, req.body);
  response.success(res, 200, updatedPost);
};

exports.remove = async (req, res) => {
  await postsService.remove(req.post.id);
  response.success(res, 204);
};

exports.getPostComments = async (req, res) => {
  const comments = await commentsService.getByPostId(req.post.id);
  response.success(res, 200, comments);
};

exports.createPostComments = async (req, res) => {
  const newComment = await commentsService.create({
    post_id: req.post.id,
    content: req.body.content,
  });
  response.success(res, 201, newComment);
};
