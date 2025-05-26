const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Name is required." },
    },
    email: {
      notEmpty: { errorMessage: "Email is required." },
    },
    phone: {
      notEmpty: { errorMessage: "Phone is required." },
    },
  }),
  handlerValidationErrors,
];
