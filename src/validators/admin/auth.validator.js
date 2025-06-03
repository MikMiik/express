const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const usersService = require("@/services/users.service");
const md5 = require("md5");

exports.register = [
  (req, res, next) => {
    res.view = "admin/auth/register";
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Registration error: Please enter your name" },
    },
    email: {
      notEmpty: {
        errorMessage: "Registration error: Please enter your email",
      },
      isEmail: {
        errorMessage: "Registration error: Not a valid e-mail address",
      },
      custom: {
        options: async (value, { req }) => {
          const user = await usersService.getByEmail(value);
          if (user) {
            throw new Error(
              "Registration error: This email has already existed",
            );
          }
        },
      },
    },
    password: {
      isStrongPassword: {
        errorMessage: "Registration failed: Password must be strong enough",
      },
    },
  }),
  handleValidationErrors,
];

exports.login = [
  (req, res, next) => {
    res.view = "admin/auth/login";
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
            throw new Error(
              "Login failed: Please check your login information",
            );
          }
        },
      },
    },
  }),
  handleValidationErrors,
];
