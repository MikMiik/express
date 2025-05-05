const { checkSchema } = require("express-validator");
const handlerValidationErrors = require("./handlerValidationError");

exports.createCategoryValidator = [
  checkSchema({
    type: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
      //   customSanitizer: {
      //     options: (value) => value.toLowerCase(),
      //   },

      // Cách trên làm thay đổi cách viết của người nhập

      custom: {
        options: (value) => {
          const allowedType = ["health", "game", "travel"];
          if (!allowedType.includes(value.totoLowerCase())) {
            throw new Error("Type phải là một trong: health, game, travel");
          } else return true;
        },
      },
      //   isIn: {
      //     options: [["health", "game", "travel"]],
      //     errorMessage: "Type phải là một trong: Health, Game, Travel",
      //   },
    },
    description: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
  }),
  handlerValidationErrors,
];

exports.updateCategoryValidator = [
  checkSchema({
    type: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
      //   customSanitizer: {
      //     options: (value) => value.toLowerCase(),
      //   },
      custom: {
        options: (value) => {
          const allowedType = ["health", "game", "travel"];
          if (!allowedType.includes(value.toLowerCase())) {
            throw new Error("Type phải là một trong: health, game, travel");
          } else return true;
        },
      },
      //   isIn: {
      //     options: [["health", "game", "travel"]],
      //     errorMessage: "Type phải là một trong: Health, Game, Travel",
      //   },
    },
    description: {
      notEmpty: { errorMessage: "Trường này không được để trống" },
    },
  }),
  handlerValidationErrors,
];
