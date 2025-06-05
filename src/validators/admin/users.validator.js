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
      notEmpty: { errorMessage: "Create error: Name is required." },
    },
    email: {
      notEmpty: { errorMessage: "Create error: Email is required." },
      isEmail: { errorMessage: "Create error: Not a valid e-mail address" },
      custom: {
        options: async (value, { req }) => {
          const existingUser = await usersService.getByEmail(value);
          if (existingUser) {
            throw new Error("Create error: Email has already in use");
          }
          return true;
        },
      },
    },
    username: {
      notEmpty: { errorMessage: "Create error: Username is required." },
    },
    phone: {
      notEmpty: { errorMessage: "Create error: Phone is required." },
      isMobilePhone: {
        options: ["vi-VN"],
        errorMessage: "Create error: Not a valid mobile phone",
      },
      custom: {
        options: async (value, { req }) => {
          const phoneOwner = await usersService.getByPhoneNumber(value);
          if (phoneOwner) {
            throw new Error("Create error: Phone number has already in use");
          }
          return true;
        },
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

exports.updateUser = [
  (req, res, next) => {
    res.view = `admin/users/edit`;
    next();
  },
  checkSchema({
    name: {
      notEmpty: { errorMessage: "Update error: Name is required." },
    },
    email: {
      notEmpty: { errorMessage: "Update error: Email is required." },
      isEmail: { errorMessage: "Update error: Not a valid e-mail address" },
      custom: {
        options: async (value, { req }) => {
          const editingUser = await usersService.getById(req.params.id);
          const emailOwner = await usersService.getByEmail(value);
          if (emailOwner && emailOwner.id !== editingUser.id) {
            throw new Error("Update error: Email has already in use");
          }
          return true;
        },
      },
    },
    username: {
      notEmpty: { errorMessage: "Update error: Username is required." },
    },
    phone: {
      notEmpty: { errorMessage: "Update error: Phone is required." },
      isMobilePhone: {
        options: ["vi-VN"],
        errorMessage: "Update error: Not a valid mobile phone",
      },
      custom: {
        options: async (value, { req }) => {
          const editingUser = await usersService.getById(req.params.id);
          const phoneOwner = await usersService.getByPhoneNumber(value);
          if (phoneOwner && phoneOwner.id !== editingUser.id) {
            throw new Error("Update error: Phone has already in use");
          }
          return true;
        },
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
