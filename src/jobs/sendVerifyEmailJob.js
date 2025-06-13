const transporter = require("@/configs/admin/mailer");
const usersService = require("@/services/users.service");
const loadMail = require("@/utils/loadEmail");

async function sendVerifyEmailJob(job) {
  const { userId, token, verifyUrl } = JSON.parse(job.payload);
  const user = await usersService.getById(userId);

  const template = await loadMail("auth/verification", {
    token,
    userId: user.id,
    verifyUrl,
  });
  const message = {
    from: process.env.MAIL_SENDER_FROM,
    to: "minh0936532430@gmail.com",
    subject: "Verify Message",
    html: template,
  };
  await transporter.sendMail(message);
}

module.exports = sendVerifyEmailJob;
