const postsModel = require("@/models/posts.model");
const { success } = require("@/utils/response");
const throwError = require("@/utils/throwError");

const getPosts = async (req, res) => {
  const posts = await postsModel.getPosts();
  success(res, 200, posts);
};

const getPost = async (req, res) => {
  const user = await postsModel.getPost(req.params.id);
  if (!user) throwError(404, "Post not found");
  success(res, 200, user);
};

const createPost = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);

  const query = `INSERT INTO posts (${columns}) VALUES (${placeholders});`;
  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...data,
  };
};

const updatePost = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE posts SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

const deletePost = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from posts where id = ?`, [
    id,
  ]);
  return affectedRows > 0;
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
