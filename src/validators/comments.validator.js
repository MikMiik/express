const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createCommentValidator = [
  checkSchema({
    content: {
      exists: { errorMessage: "Content is required" },
      notEmpty: {
        errorMessage: "Content is not empty.",
      },
    },
  }),
  handlerValidationErrors,
];

exports.updateCommentValidator = [
  checkSchema({
    content: {
      optional: true,
      notEmpty: {
        errorMessage: "Content is not empty.",
      },
    },
  }),
  handlerValidationErrors,
];
