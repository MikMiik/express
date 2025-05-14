const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createPostValidator = [
  checkSchema({
    title: {
      exists: { errorMessage: "Title is required" },
      notEmpty: { errorMessage: "Title is not empty." },
    },
    description: {
      exists: { errorMessage: "Description is required" },
      notEmpty: { errorMessage: "Description is not empty." },
    },
    content: {
      exists: { errorMessage: "Content is required" },
      notEmpty: { errorMessage: "Content is not empty." },
    },
  }),
  handlerValidationErrors,
];

exports.updatePostValidator = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: {
        errorMessage: "Title cannot be empty if provided",
      },
    },
    description: {
      optional: true,
      notEmpty: {
        errorMessage: "Description cannot be empty if provided",
      },
    },
    content: {
      optional: true,
      notEmpty: {
        errorMessage: "Content cannot be empty if provided",
      },
    },
  }),
  handlerValidationErrors,
];
