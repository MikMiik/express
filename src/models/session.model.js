const { db } = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

const table = "`sessions`";

exports.findById = async (id) => {
  const [rows] = await db.query(
    `SELECT * FROM ${table} WHERE id = ? AND expires_at > NOW()`,
    [id],
  );
  return rows[0];
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders});`;
  await db.query(query, values);

  return {
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

exports.logout = async (sid) => {
  await db.query(`UPDATE ${table} SET expires_at = ? WHERE id = ?;`, [
    new Date(),
    sid,
  ]);
};
