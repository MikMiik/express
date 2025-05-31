const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);
router.get("/forgot-password", authController.showForgotForm);
router.get("/reset-password", authController.showResetForm);
router.post("/logout", authController.logout);

module.exports = router;
