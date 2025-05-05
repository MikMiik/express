const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

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
  handlerValidationErrors,
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
  handlerValidationErrors,
];
