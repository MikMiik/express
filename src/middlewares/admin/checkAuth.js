function checkAuth(req, res, next) {
  const isAuthRequired = !["/register", "/login", "/forgot-password"].includes(
    req.path,
  );
  if (!res.locals.auth && isAuthRequired) {
    return res.redirect("/admin/login");
  } else if (res.locals.auth && !isAuthRequired) {
    return res.redirect("/admin/");
  }
  next();
}

module.exports = checkAuth;
