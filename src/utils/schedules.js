require("module-alias/register");
require("dotenv").config();
const cron = require("node-cron");
const queue = require("@/utils/queue");
const usersService = require("@/services/users.service");

cron.schedule("* 00 20 * * *", () => {
  console.log("running a task every minute");

  //   const verifyUrl = `${req.protocol}://${req.host}/admin/verify-email?token=${token}`;
  queue.dispatch("sendVerifyEmailJob", {
    userId: 43,
    token: 123,
    verifyUrl: ":)))",
  });
});
