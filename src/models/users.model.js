const { db } = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");
const dayjs = require("dayjs");

const table = "`users`";

exports.findAll = async (page, limit) => {
  const offset = (page - 1) * limit;
  const [users] = await db.query(
    `SELECT * FROM ${table} ORDER BY created_at desc limit ? offset ?`,
    [limit, offset],
  );
  return users;
};

exports.count = async () => {
  const [[{ total }]] = await db.query(
    `select count(*) as total from ${table}`,
  );
  return total;
};

exports.countNewUsers = async () => {
  const date = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  const startTime = `${date} 00:00:00`;
  const endTime = `${date} 23:59:59`;
  const [[{ count }]] = await db.query(
    `select count(*) as count from ${table} where created_at between ? and ?`,
    [startTime, endTime],
  );
  return count;
};

exports.findById = async (id) => {
  const [users] = await db.query(
    `SELECT * FROM ${table} WHERE id = ? OR name = ?`,
    [id, id],
  );
  return users[0];
};

exports.findByEmail = async (email) => {
  const [users] = await db.query(`SELECT * FROM ${table} WHERE email = ?`, [
    email,
  ]);
  return users[0];
};

exports.findByEmailAndPassword = async (email, password) => {
  const [users] = await db.query(
    `SELECT * FROM ${table} WHERE email = ? and password = ?`,
    [email, password],
  );
  return users[0];
};

exports.findByPhoneNumber = async (phone) => {
  const [users] = await db.query(`SELECT * FROM ${table} WHERE phone = ?`, [
    phone,
  ]);
  return users[0];
};

exports.findByDeletedAt = async () => {
  const [users] = await db.query(
    `SELECT * FROM ${table} WHERE deleted_at is not null`,
  );
  return users;
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
