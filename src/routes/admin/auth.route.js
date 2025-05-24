const express = require("express");
const authController = require("@/controllers/admin/auth.controller");
const router = express.Router();

router.get("/login", authController.showLoginForm);

module.exports = router;
