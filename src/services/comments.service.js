const db = require("@/configs/db");
const { readDB, writeDB } = require("../utils/jsonDb");

const RESOURCE = "comments";

const getAllComments = async (RESOURCE) => {
  const comments = await readDB(RESOURCE);
  return comments;
};

const getCommentById = async (id) => {
  const comments = await getAllComments(RESOURCE);
  const comment = comments.find((comment) => comment.id === +id);
  return comment;
};

const getCommentsByPostId = async (postId) => {
  const comments = await getAllComments(RESOURCE);
  return comments.filter((comment) => comment.post_id === +postId);
};

const createComment = async (data) => {
  const comments = await getAllComments(RESOURCE);
  const nextID = (comments.at(-1)?.id ?? 0) + 1;
  const newComment = {
    id: nextID,
    ...data,
  };
  const newComments = [...comments, newComment];
  await writeDB(RESOURCE, newComments);
  return newComment;
};

const updateComment = async (id, data) => {
  const comments = await getAllComments(RESOURCE);
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

const deleteComment = async (id) => {
  const comments = await getAllComments(RESOURCE);
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
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
};
