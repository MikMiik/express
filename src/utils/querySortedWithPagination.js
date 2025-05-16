const db = require("@/configs/db");

exports.querySortedWithPagination = async (
  table,
  limit = 10,
  offset = 10,
  orderBy = "created_at"
) => {
  const [rows] = await db.query(
    `SELECT * FROM ${table} ORDER BY ${orderBy} DESC LIMIT ? OFFSET ?;`,
    [limit, offset]
  );

  const [[{ count }]] = await db.query(
    `SELECT count(*) AS count FROM ${table}`
  );

  return { rows, count };
};
