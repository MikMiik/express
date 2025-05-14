const db = require("@/configs/db");
const { readDB, writeDB } = require("../utils/jsonDb");

const RESOURCE = "posts";

const getAllPosts = async (RESOURCE) => {
  const posts = await readDB(RESOURCE);
  return posts;
};

const getPostById = async (id) => {
  const posts = await getAllPosts(RESOURCE);
  const post = posts.find((post) => post.id === +id);
  return post;
};

const createPost = async (data) => {
  const posts = await getAllPosts(RESOURCE);
  const nextID = (posts.at(-1)?.id ?? 0) + 1;
  const newPost = {
    id: nextID,
    ...data,
  };
  const newPosts = [...posts, newPost];
  await writeDB(RESOURCE, newPosts);
  return newPost;
};

const updatePost = async (id, data) => {
  const posts = await getAllPosts(RESOURCE);
  let postIndex = -1;
  const postUpdate = posts.find((post, index) => {
    if (post.id === +id) {
      postIndex = index;
      return true;
    }
    return false;
  });

  if (postIndex === -1 || !postUpdate) return;
  const updatedItem = { ...postUpdate, ...data };
  const newPosts = [
    ...posts.slice(0, postIndex),
    updatedItem,
    ...posts.slice(postIndex + 1),
  ];
  await writeDB(RESOURCE, newPosts);
  return updatedItem;
};

const deletePost = async (id) => {
  const posts = await getAllPosts(RESOURCE);
  const postDelete = posts.findIndex((post) => post.id === +id);

  if (postDelete === -1) return;
  const newPosts = posts.filter((_, index) => index !== postDelete);
  await writeDB(RESOURCE, newPosts);
  return true;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
