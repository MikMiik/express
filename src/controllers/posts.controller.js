const postsService = require("@/services/posts.service");
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
  response.success(res, 200, post);
};

const createPost = async (req, res) => {
  const newPost = await postsService.createPost(req.body);
  response.success(res, 201, newPost);
};

const updatePost = async (req, res) => {
  const updatedItem = await postsService.updatePost(req.params.id, req.body);
  if (!updatedItem) throw404();
  response.success(res, 200, updatedItem);
};

const deletePost = async (req, res) => {
  const result = await postsService.deletePost(req.params.id);
  if (!result) throw404();
  res.status(200).send();
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
