const mysql = require("mysql2/promise");

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

const createDatabase = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
  } catch (error) {
    throw error;
  } finally {
    connection?.end();
  }
};

const db = mysql.createPool({
  host,
  port,
  user: "root",
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const testQuery = async () => {
  let connection = await db.getConnection();
  try {
    await connection.query("SELECT 1");
    console.log("Connect DB succeedded");
  } catch (error) {
    throw error;
  } finally {
    connection?.release();
  }
};

const pool = {
  createDatabase,
  db,
  testQuery,
};

module.exports = pool;
