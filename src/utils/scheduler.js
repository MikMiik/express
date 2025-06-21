const cron = require("node-cron");
const acctiveTasks = {};

function scheduleJob(name, cronTime, handler) {
  if (acctiveTasks[name]) {
    return console.log(`Task ${name} existed`);
  }
  const task = cron.schedule(cronTime, () => {
    try {
      handler();
    } catch (error) {
      console.log(error);
    }
  });
  acctiveTasks[name] = task;
}

module.exports = scheduleJob;
