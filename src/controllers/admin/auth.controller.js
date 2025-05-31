const sessionService = require("@/services/session.service");
const usersService = require("@/services/users.service");
const md5 = require("md5");

exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "./admin/layouts/auth",
  });
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = md5(req.body.password);
  const user = await usersService.getByEmailAndPassword(email, password);
  if (user) {
    req.session.set("userId", user.id);
    res.redirect("/admin");
  }
};

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register", {
    layout: "./admin/layouts/auth",
  });
};

exports.register = async (req, res) => {
  let { confirm_password, ...body } = req.body;
  const avatar = req.file
    ? `/uploads/${req.file.filename}`
    : `/uploads/default-avatar.jpg`;
  body.avatar = avatar;
  await usersService.create({ ...body, password: md5(req.body.password) });
  res.redirect("/admin/login");
};

exports.showForgotForm = async (req, res) => {
  res.render("admin/auth/forgot-password", {
    layout: "./admin/layouts/auth",
  });
};
exports.showResetForm = async (req, res) => {
  res.render("admin/auth/reset-password", {
    layout: "./admin/layouts/auth",
  });
};

exports.logout = async (req, res) => {
  await sessionService.logout(req.cookies.id);
  res.redirect("/admin/login");
};
