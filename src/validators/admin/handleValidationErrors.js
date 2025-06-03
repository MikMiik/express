const usersService = require("@/services/users.service");
const { validationResult } = require("express-validator");
const { formatDate, formatDay } = require("@/utils/dayjsFormat");

const handleValidationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    delete req.session.flash;
    return next();
  }

  const formatted = errors
    .array({
      onlyFirstError: true,
    })
    // .map((error) => ({
    //   field: error.path,
    //   message: error.msg,
    // }))
    .reduce((errors, error) => {
      errors[error.path] = error.msg;
      req.flash("error", error.msg);
      return errors;
    }, {});
  // console.log(req.body);
  // console.log(formatted);

  let layout;
  const user = await usersService.getById(req.params.id);
  if (res.view.includes("admin/auth")) layout = "./admin/layouts/auth";

  // req.flash("error", "Login failed: Please check your login information");
  const flash = req.flash("error");
  res.render(res.view, {
    user,
    formatDate,
    formatDay,
    flash,
    errors: formatted,
    old: req.body,
    layout,
  });
};

module.exports = handleValidationErrors;
