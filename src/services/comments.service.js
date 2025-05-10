const { readDB, writeDB } = require("../utils/files.util");

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

const createComment = async (data) => {
  const comments = await getAllComments(RESOURCE);
  const newcomment = {
    id: (comments.at(-1)?? 0) + 1,
    content: data.content,
  };
  const newComments = [...comments, newcomment]
  await writeDB(RESOURCE, newComments);
  return newcomment;
};

const updateComment = async (id, data) => {
  const comments = await getAllComments(RESOURCE);
  let commentIndex = -1
  const commentUpdate = comments.find((comment, index) => {
    if(comment.id === +id) {
      commentIndex = index
      return true;
    }
    return false
  });

  if (commentIndex === -1 || !commentUpdate) return;
  const updatedItem = {...commentUpdate,...data}
  const newComments = [
    ...comments.slice(0, commentIndex),
    updatedItem,
    ...comments.slice(commentIndex + 1)
  ]
  await writeDB(RESOURCE, newComments);
  return updatedItem;
};

const deleteComment = async (id) => {
  const comments = await getAllComments(RESOURCE);
  const commentDelete = comments.findIndex((comment) => comment.id === +id);

  if (commentDelete === -1) return;
  const newComments = comments.filter((_, index)=> index !== commentDelete)
  await writeDB(RESOURCE, newComments);
  return true;
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};