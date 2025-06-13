const { db } = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

const table = "`queues`";

exports.findPendingJobs = async () => {
  const [rows] = await db.query(
    `SELECT * FROM ${table} WHERE status = "pending"`,
  );
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
  return rows[0];
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
