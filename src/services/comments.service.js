const db = require("@/configs/db");
const { readDB, writeDB } = require("../utils/jsonDb");

const RESOURCE = "comments";

const getAllPosts = async (RESOURCE) => {
  const comments = await readDB(RESOURCE);
  return comments;
};

const getPostById = async (id) => {
  const comments = await getAllPosts(RESOURCE);
  const comment = comments.find((comment) => comment.id === +id);
  return comment;
};

const createPost = async (data) => {
  const comments = await getAllPosts(RESOURCE);
  const nextID = (comments.at(-1)?.id ?? 0) + 1;
  const newComment = {
    id: nextID,
    ...data,
  };
  const newComments = [...comments, newComment];
  await writeDB(RESOURCE, newComments);
  return newComment;
};

const updatePost = async (id, data) => {
  const comments = await getAllPosts(RESOURCE);
  let commentIndex = -1;
  const commentUpdate = comments.find((comment, index) => {
    if (comment.id === +id) {
      commentIndex = index;
      return true;
    }
    return false;
  });

  if (commentIndex === -1 || !commentUpdate) return;
  const updatedItem = { ...commentUpdate, ...data };
  const newComments = [
    ...comments.slice(0, commentIndex),
    updatedItem,
    ...comments.slice(commentIndex + 1),
  ];
  await writeDB(RESOURCE, newComments);
  return updatedItem;
};

const deletePost = async (id) => {
  const comments = await getAllPosts(RESOURCE);
  const commentDeleteIndex = comments.findIndex(
    (comment) => comment.id === +id
  );

  if (commentDeleteIndex === -1) return;
  const newComments = comments.filter(
    (_, index) => index !== commentDeleteIndex
  );
  await writeDB(RESOURCE, newComments);
  return true;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
