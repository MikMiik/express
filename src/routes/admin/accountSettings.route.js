const express = require("express");
const router = express.Router();

const accountSettingsController = require("@/controllers/admin/accountSettings.controller");

router.get("/", accountSettingsController.index);

module.exports = router;
