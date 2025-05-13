const db = require("@/configs/db");

exports.getUsers = async () => {
  const [users] = await db.query("select * from users");
  return users;
};

exports.getUser = async (id) => {
  const [user] = await db.query(
    "SELECT * FROM `users` WHERE id = ? or username = ?",
    [id, id]
  );
  return user[0];
};

exports.createUser = async () => {
  /* INSERT INTO table_name (column1, column2, column3,...)
VALUES (value1, value2, value3,...) */
};
