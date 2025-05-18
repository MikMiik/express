const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");
const {
  querySortedWithPagination,
} = require("@/utils/querySortedWithPagination");

const table = "`comments`";

exports.findAll = async (limit = 10, offset = 10) => {
  const { rows, count } = await querySortedWithPagination(
    table,
    limit,
    offset,
    "created_at"
  );
  return { rows, count };
};
exports.findAllNoPagination = async () => {
  const [comments] = await db.query(`SELECT * FROM ${table}`);
  return comments;
};

exports.findById = async (id) => {
  const [comments] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [
    id,
  ]);
  return comments[0];
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT into ${table} (${columns}) VALUES (${placeholders});`;
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
    [id]
  );
  return affectedRows > 0;
};
