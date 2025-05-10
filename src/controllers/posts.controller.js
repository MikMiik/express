const postService = require("@/services/posts.service");
const throwError = require("@/utils/throwError");
const response = require("@/utils/response");

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts("posts");
  if (!posts) throwError(404, "Post not found");
  response.success(res, 200, posts);
};

const getPostById = async (req, res) => {
  const post = await postService.getPostById(req.params.id);
  if (!post) throwError(404, "Post not found");
  response.success(res, 200, post);
};

const createPost = async (req, res) => {
  const newPost = await postService.createPost(req.body);
  response.success(res, 201, newPost);
};

const updatePost = async (req, res) => {
  const updatedItem = await postService.updatePost(req.params.id, req.body);
  if (!updatedItem) throwError(404, "Post not found");
  response.success(res, 200, updatedItem);
};

const deletePost = async (req, res) => {
  const result = await postService.deletePost(req.params.id);
  if (!result) throwError(404, "Post not found");
  res.status(200).send();
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };
