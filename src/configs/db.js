const mysql = require("mysql2/promise");

const host = "localhost";
const port = 3306;
const user = "root";
const password = "Minhthnd512006";
const database = "tyhh_db";

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
