const fs = require("fs").promises;

const DB_FILE = "./db.json";
async function readDB(resource) {
  try {
    const jsonDB = await fs.readFile(DB_FILE, "utf-8");
    return jsonDB ? JSON.parse(jsonDB)[resource] : [];
  } catch (error) {
    return error;
  }
}

async function writeDB(resource, data) {
  let db;
  try {
    const jsonDB = await fs.readFile(DB_FILE, "utf-8");
    // db = JSON.parse(jsonDB)[resource];
    jsonDB ? (db = JSON.parse(jsonDB)) : (db = {});
  } catch (error) {}
  db[resource] = data;
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

module.exports = { readDB, writeDB };
