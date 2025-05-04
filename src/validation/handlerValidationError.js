const { validationResult } = require("express-validator");

const handlerValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const formatted = errors
    .array({
      onlyFirstError: true,
    })
    .map((error) => ({
      field: error.path,
      message: error.msg,
    }));

  res.status(422).json({
    errors: formatted,
  });
};

module.exports = handlerValidationErrors;
