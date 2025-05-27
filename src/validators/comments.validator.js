const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createCommentValidator = [
  checkSchema({
    content: {
      exists: { errorMessage: "Content is required" },
      notEmpty: {
        errorMessage: "Content is not empty.",
      },
    },
  }),
  handleValidationErrors,
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
  handleValidationErrors,
];
