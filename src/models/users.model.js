const db = require("@/configs/db");

exports.getUsers = async ({ page = 1, limit = 10 } = {}) => {
  const offset = (page - 1) * 10;
  const [users] = await db.query(
    `select * from users ORDER BY id ASC limit ${limit} OFFSET ${offset};`
  );
  const [usersCount] = await db.query(
    "select count(*) as users_count from users"
  );
  const users_count = usersCount[0].users_count;
  const last_page = Math.ceil(users_count / limit);
  const pagination = {
    current_page: +page,
    per_page: +limit,
    total: users_count,
    last_page,
  };
  return { users, pagination };
};

exports.getUser = async (id) => {
  const [user] = await db.query(
    "SELECT * FROM `users` WHERE id = ? or username = ?",
    [id, id]
  );
  return user[0];
};
