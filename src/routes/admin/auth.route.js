const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

router.get("/login", authController.showLoginForm);
router.get("/register", authController.showRegisterForm);
router.get("/forgot-password", authController.showForgotForm);
router.get("/reset-password", authController.showResetForm);

module.exports = router;
