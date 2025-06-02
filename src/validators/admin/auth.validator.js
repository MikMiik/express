const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const usersService = require("@/services/users.service");
const md5 = require("md5");

exports.register = [
  (req, res, next) => {
    res.view = "admin/register";
    res.setFlash({
      type: "error",
      message: "Register failed: Please check your register information",
    });
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Please enter your name" },
    },
    email: {
      notEmpty: { errorMessage: "Please enter your email" },
      isEmail: { errorMessage: "Not a valid e-mail address" },
      custom: {
        options: async (value, { req }) => {
          const user = await usersService.getByEmail(value);
          if (user) {
            throw new Error("This email has already existed");
          }
        },
      },
    },
    password: {
      isStrongPassword: { errorMessage: "Password must be strong enough" },
    },
    phone: {
      notEmpty: { errorMessage: "Please enter your phone number" },
      isMobilePhone: {
        options: ["vi-VN"],
        errorMessage: "Not a valid mobile phone",
      },
    },
  }),
  handleValidationErrors,
];

exports.login = [
  (req, res, next) => {
    res.view = "admin/auth/login";
    res.setFlash({
      type: "error",
      message: "Login failed: Please check your login information",
    });
    next();
  },
  checkSchema({
    customValidation: {
      custom: {
        options: async (value, { req }) => {
          const { email, password } = req.body;
          const user = await usersService.getByEmailAndPassword(
            email,
            md5(password),
          );
          if (!user) {
            throw new Error();
          }
        },
      },
    },
  }),
  handleValidationErrors,
];
