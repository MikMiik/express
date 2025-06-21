const transporter = require("@/configs/admin/mailer");
const usersService = require("@/services/users.service");

async function sendDailyReportEmail() {
  const countNewUsers = await usersService.countNewUsers();
  const { total: totalUsers } = await usersService.getAll();
  console.log(countNewUsers, totalUsers);
  // const message = {
  //   from: process.env.MAIL_SENDER_FROM,
  //   to: "minh093653243@gmail.com",
  //   subject: "Verify Message",
  //   html: `<h1>Hello</h1>`,
  // };
  // await transporter.sendMail(message);
}

module.exports = sendDailyReportEmail;
