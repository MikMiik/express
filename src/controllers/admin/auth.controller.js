const usersService = require("@/services/users.service");
const md5 = require("md5");
const transporter = require("@/configs/admin/mailer");
const { createToken, verifyToken } = require("@/utils/jwt");
const queue = require("@/utils/queue");

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "./admin/layouts/auth",
    errors: {},
    old: {},
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await usersService.getByEmailAndPassword(email, password);

  if (user) {
    req.session.userId = user.id;
    req.flash("success", "Login successful");
    res.redirect("/admin");
  }
};

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register", {
    layout: "./admin/layouts/auth",
    errors: {},
    old: {},
  });
};

exports.register = async (req, res) => {
  let { confirm_password, terms, ...body } = req.body;
  const avatar = req.file
    ? `/uploads/${req.file.filename}`
    : `/uploads/default-avatar.jpg`;
  body.avatar = avatar;
  const user = await usersService.create({
    ...body,
    password: md5(req.body.password),
  });
  const token = createToken({ userId: user.id }, { expiresIn: 60 * 60 * 12 });

  const verifyUrl = `${req.protocol}://${req.host}/admin/verify-email?token=${token}`;

  queue.dispatch("sendVerifyEmailJob", { userId: user.id, token, verifyUrl });
  res.redirect("/admin/login");
};

exports.showForgotForm = async (req, res) => {
  res.render("admin/auth/forgot-password", {
    layout: "./admin/layouts/auth",
  });
};

exports.sendForgotEmail = async (req, res) => {
  const message = {
    from: process.env.MAIL_SENDER_FROM,
    to: req.body.email,
    subject: "Reset Link",
    html: `
    <div>
      <p style = "color: red"> Bye </p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgVqPfCA2AvKZIYM_vcKxX0ZSxJBeb7YUDQ&s"/>
    </div>
    `,
  };
  await transporter.sendMail(message);
};

exports.showResetForm = async (req, res) => {
  res.render("admin/auth/reset-password", {
    layout: "./admin/layouts/auth",
  });
};

exports.logout = async (req, res) => {
  delete req.session.userId;
  return res.redirect("/admin/login");
};

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const result = verifyToken(token);
  if (result.success) {
    const userId = result.data.userId;
    const user = await usersService.getById(userId);
    if (user.verified_at) {
      req.flash("info", "Verification link is expired or invalid");
      console.log(req.flash);
      return res.redirect("/admin/login");
    }
    await usersService.update(userId, {
      verified_at: new Date(),
    });
    req.flash("success", "Verify success");
    return res.redirect("/admin/login");
  }
  req.flash("error", "Verify failed");
  res.redirect("/admin/login");
};
