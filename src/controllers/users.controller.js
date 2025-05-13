const usersModel = require("@/models/users.model");
const { success } = require("@/utils/response");
const throwError = require("@/utils/throwError");

const getUsers = async (req, res) => {
  const { users, pagination } = await usersModel.getUsers(req.query);
  const data = {
    users: users,
    pagination,
  };
  success(res, 200, data);
};

const getUser = async (req, res) => {
  const user = await usersModel.getUser(req.params.id);
  if (!user) throwError(404, "User not found");
  success(res, 200, user);
};

const createUser = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);

  const query = `INSERT INTO users (${columns}) VALUES (${placeholders});`;
  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...data,
  };
};

const updateUser = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE users SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

const deleteUser = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from users where id = ?`, [
    id,
  ]);
  return affectedRows > 0;
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
