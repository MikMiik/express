const postsService = require("@/services/posts.service");
const commentsService = require("@/services/comments.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

const getAllPosts = async (req, res) => {
  const posts = await postsService.getAllPosts("posts");
  if (!posts) throw404();
  response.success(res, 200, posts);
};

const getPostById = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) throw404();
  const comments = await commentsService.getCommentsByPostId(post.id);
  const data = {
    ...post,
    comments,
  };
  response.success(res, 200, data);
};

const createPost = async (req, res) => {
  const newPost = await postsService.createPost(req.body);
  response.success(res, 201, newPost);
};

const updatePost = async (req, res) => {
  const updatedPost = await postsService.updatePost(req.params.id, req.body);
  if (!updatedPost) throw404();
  response.success(res, 200, updatedPost);
};

const deletePost = async (req, res) => {
  const result = await postsService.deletePost(req.params.id);
  if (!result) throw404();
  res.status(200).send();
};

const getPostComments = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) throw404();
  const comments = await commentsService.getCommentsByPostId(post.id);
  response.success(res, 200, comments);
};

const createPostComments = async (req, res) => {
  const post = await postsService.getPostById(req.params.id);
  if (!post) throw404();

  const newComment = await commentsService.createComment({
    post_id: post.id,
    content: req.body.content,
  });
  response.success(res, 201, newComment);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostComments,
  createPostComments,
};
