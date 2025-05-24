const express = require("express");
const router = express.Router();

const analyticsController = require("@/controllers/admin/analytics.controller");

router.get("/", analyticsController.index);

module.exports = router;
