const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");
const usersService = require("@/services/users.service");

exports.createUser = [
  (req, res, next) => {
    res.view = "admin/users/create";
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Name is required." },
    },
    email: {
      notEmpty: { errorMessage: "Email is required." },
      isEmail: { errorMessage: "Not a valid e-mail address" },
      custom: {
        options: async (value, { req }) => {
          const existingUser = await usersService.getByEmail(value);
          if (existingUser) {
            throw new Error("A user already exists with this e-mail address");
          }
        },
      },
    },
    phone: {
      notEmpty: { errorMessage: "Phone is required." },
      isMobilePhone: {
        options: ["vi-VN"],
        errorMessage: "Not a valid mobile phone",
      },
    },
  }),
  handleValidationErrors,
];

exports.updateUser = [
  (req, res, next) => {
    res.view = `admin/users/edit`;
    res.setFlash({
      type: "error",
      message: "Error edit",
    });
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Name is required." },
    },
    email: {
      notEmpty: { errorMessage: "Email is required." },
      isEmail: { errorMessage: "Not a valid e-mail address" },
      custom: {
        options: async (value, { req }) => {
          const editingUser = await usersService.getById(req.params.id);
          const emailOwner = await usersService.getByEmail(value);
          if (emailOwner && emailOwner.id !== editingUser.id) {
            throw new Error("Email is already in use");
          }
          return true;
        },
      },
    },
    phone: {
      notEmpty: { errorMessage: "Phone is required." },
      isMobilePhone: {
        options: ["vi-VN"],
        errorMessage: "Not a valid mobile phone",
      },
    },
    password: {
      custom: {
        options: (value) => {
          if (value === "" || value === null) return true;
          if (value.length < 8) {
            throw new Error("Password must be at least 8 characters long");
          }

          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
          if (!regex.test(value)) {
            throw new Error(
              "Password must include uppercase, lowercase, number, and special character",
            );
          }

          return true;
        },
      },
    },
    confirm_password: {
      optional: true,
      custom: {
        options: (value, { req }) => {
          if (req.body.password && value !== req.body.password) {
            throw new Error("Passwords do not match");
          }
          return true;
        },
      },
    },
  }),
  handleValidationErrors,
];
