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
      return errors;
    }, {});
  console.log(req.body);
  console.log(formatted);
  const user = await usersService.getById(req.params.id);
  let layout;
  if (res.view.includes("admin/auth")) layout = "./admin/layouts/auth";
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  res.render(res.view, {
    user,
    formatDate,
    formatDay,
    errors: formatted,
    old: req.body,
    layout,
  });
};

module.exports = handleValidationErrors;
