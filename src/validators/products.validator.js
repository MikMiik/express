const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

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
  handleValidationErrors,
];

exports.updateProductValidator = [
  checkSchema({
    title: {
      optional: true,
    },
    price: {
      optional: true,
      isFloat: {
        options: { min: 100, max: 5000 },
        errorMessage: "Giá trong khoảng 100-5000",
      },
    },
  }),
  handleValidationErrors,
];
