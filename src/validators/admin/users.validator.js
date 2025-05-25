const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Name is not empty." },
    },
    email: {
      notEmpty: { errorMessage: "Email is not empty." },
    },
    phone: {
      notEmpty: { errorMessage: "Phone is not empty." },
    },
  }),
  handlerValidationErrors,
];
