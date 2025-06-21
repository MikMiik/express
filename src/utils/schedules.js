require("module-alias/register");
require("dotenv").config();
const cron = require("node-cron");
const queue = require("@/utils/queue");

cron.schedule("00 00 20 * * *", () => {
  console.log("running a task every minute");
});
