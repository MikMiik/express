const usersService = require("@/services/users.service");
const md5 = require("md5");
const transporter = require("@/configs/admin/mail");

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
  const message = {
    from: process.env.MAIL_SENDER_FROM,
    to: "minh0936532430@gmail.com",
    subject: "List Message",
    html: `
    <div>
      <p style = "color: red"> Bye </p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPgVqPfCA2AvKZIYM_vcKxX0ZSxJBeb7YUDQ&s"/>
    </div>
    `,
  };
  await transporter.sendMail(message);

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
  delete req.session.userId;
  return res.redirect("/admin/login");
};
