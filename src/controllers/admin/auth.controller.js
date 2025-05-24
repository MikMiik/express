exports.showLoginForm = async (req, res) => {
  res.render("admin/auth/login", {
    layout: "./admin/layouts/auth",
  });
};

exports.showRegisterForm = async (req, res) => {
  res.render("admin/auth/register", {
    layout: "./admin/layouts/auth",
  });
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
