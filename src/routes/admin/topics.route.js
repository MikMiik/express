const express = require("express");
const router = express.Router();

const topicsController = require("@/controllers/admin/topics.controller");

router.get("/", topicsController.index);

module.exports = router;
