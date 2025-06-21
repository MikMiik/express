const { db } = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

const table = "`posts`";

exports.findAll = async (page, limit) => {
  const offset = (page - 1) * limit;
  const [posts] = await db.query(
    `SELECT * FROM ${table} ORDER BY created_at desc limit ? offset ?`,
    [limit, offset],
  );
  return posts;
};

exports.count = async () => {
  const [[{ total }]] = await db.query(
    `select count(*) as total from ${table}`,
  );
  return total;
};

exports.findById = async (id) => {
  const [posts] = await db.query(
    `SELECT * FROM ${table} WHERE id = ? OR slug= ?`,
    [id, id],
  );
  return posts[0];
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders});`;
  const [{ insertId }] = await db.query(query, values);
  return {
    id: insertId,
    ...data,
  };
};

exports.update = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE ${table} SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(
    `DELETE FROM ${table} WHERE id = ?`,
    [id],
  );
  return affectedRows > 0;
};
