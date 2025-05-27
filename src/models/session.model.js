const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

const table = "`sessions`";

exports.findBySid = async (sid) => {
  const [rows] = await db.query(`SELECT * FROM ${table} WHERE sid = ?`, [sid]);
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

exports.update = async (sid, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(sid);

  const query = `UPDATE ${table} SET ${setClause} WHERE sid = ?;`;
  await db.query(query, values);

  return {
    sid,
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
