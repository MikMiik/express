const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

const table = "`users`";

exports.findAll = async () =>
  // { page = 1, limit = 10 } = {}
  {
    // const offset = (page - 1) * 10;
    // const [users] = await db.query(
    //   `select * from users ORDER BY id ASC limit ${limit} OFFSET ${offset};`
    // );
    // const [usersCount] = await db.query(
    //   "select count(*) as users_count from users"
    // );
    // const users_count = usersCount[0].users_count;
    // const last_page = Math.ceil(users_count / limit);
    // const pagination = {
    //   current_page: +page,
    //   per_page: +limit,
    //   total: users_count,
    //   last_page,
    // };
    // return { users, pagination };
    const [users] = await db.query(`SELECT * FROM ${table}`);
    return users;
  };

exports.findById = async (id) => {
  const [users] = await db.query(
    `SELECT * FROM ${table} WHERE id = ? OR username = ?`,
    [id, id]
  );
  return users[0];
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
    [id]
  );
  return affectedRows > 0;
};
