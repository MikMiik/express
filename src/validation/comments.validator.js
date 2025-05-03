const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createCommentValidator = [
  checkSchema({
    content: {
      notEmpty: true,
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerValidationErrors,
];

exports.updateCommentValidator = [
  checkSchema({
    content: {
      optional: true,
      notEmpty: true,
      isLength: {
        options: { min: 5 },
        errorMessage: "Nghiệm không thỏa mãn",
      },
      errorMessage: "Trường này không được để trống",
    },
  }),
  handlerValidationErrors,
];
