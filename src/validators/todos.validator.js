const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createTodoValidator = [
  checkSchema({
    task: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
    done: {
      optional: true,
      isBoolean: { errorMessage: "Giá trị nhập vào phải là true hoặc false" },
      toBoolean: true,
      customSanitizer: {
        options: (value) => {
          return value === undefined ? false : value;
        },
      },
    },
  }),
  handleValidationErrors,
];

exports.updateTodoValidator = [
  checkSchema({
    task: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
    done: {
      optional: true,
      isBoolean: { errorMessage: "Giá trị nhập vào phải là true hoặc false" },
      toBoolean: true,
    },
  }),
  handleValidationErrors,
];
