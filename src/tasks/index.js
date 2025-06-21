require("module-alias/register");
require("dotenv").config();
const scheduleJob = require("@/utils/scheduler");
const sendDailyReportEmail = require("@/tasks/sendDailyReportEmail");
const backupDatabase = require("@/tasks/backupDatabase");
const deleteUserInTrash = require("./deleteUserInTrash");

scheduleJob("send_daily_report_email", "0 0 2 * * *", sendDailyReportEmail);

scheduleJob("backup_database", "0 30 2 * * *", backupDatabase);

scheduleJob("delete_user_30days", "* * * * *", deleteUserInTrash);
