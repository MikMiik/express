const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createProductValidator = [
  checkSchema({
    title: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
    price: {
      isFloat: {
        options: { min: 100, max: 5000 },
        errorMessage: "Giá trong khoảng 100-5000",
      },
    },
  }),
  handlerValidationErrors,
];

exports.updateProductValidator = [
  checkSchema({
    title: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
    price: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
      isFloat: {
        options: { min: 100, max: 5000 },
        errorMessage: "Giá trong khoảng 100-5000",
      },
    },
  }),
  handlerValidationErrors,
];
