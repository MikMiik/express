function checkAuth(req, res, next) {
  const isAuthRequired = ![
    "/register",
    "/login",
    "/forgot-password",
    "/verify-email",
  ].includes(req.path);

  if (!res.locals.auth && isAuthRequired) {
    return res.redirect("/admin/login");
  }
  if (res.locals.auth && !res.locals.auth.verified_at && isAuthRequired) {
    req.flash("error", "Please verify your account by email first");
    return res.redirect("/admin/login");
  }
  if (res.locals.auth && !isAuthRequired && res.locals.auth.verified_at) {
    return res.redirect("/admin/dashboard");
  }
  next();
}

module.exports = checkAuth;
