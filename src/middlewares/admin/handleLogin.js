const sessionService = require("@/services/session.service");

async function handleLogin(req, res, next) {
  console.log(req.cookies.id);
  if (req.cookies.id) {
    next();
  } else
    res.render("admin/auth/login", {
      layout: "./admin/layouts/auth",
    });
}

module.exports = handleLogin;
