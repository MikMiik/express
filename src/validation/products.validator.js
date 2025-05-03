const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createProductValidator = [
  checkSchema({
    product: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerValidationErrors,
];

exports.updateProductValidator = [
  checkSchema({
    product: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerValidationErrors,
];
