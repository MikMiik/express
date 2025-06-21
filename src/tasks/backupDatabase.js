const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawn;
const dayjs = require("dayjs");

async function backupDatabase() {
  const fileName = `${dayjs().format("DD-MM-YYYY")}_DB.dump.sql`;
  const dumpFilePath = path.join(
    __dirname,
    "..",
    "storage",
    "backup",
    fileName,
  );

  const writeStream = fs.createWriteStream(dumpFilePath);

  const dump = spawn("mysqldump", [
    "-u",
    process.env.DB_USER,
    `-p${process.env.DB_PASS}`,
    process.env.DB_NAME,
  ]);

  dump.stdout
    .pipe(writeStream)
    .on("finish", function () {
      console.log("Completed");
    })
    .on("error", function (err) {
      console.log(err);
    });
}

module.exports = backupDatabase;
