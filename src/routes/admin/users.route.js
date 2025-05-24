const express = require("express");
const usersController = require("@/controllers/admin/users.controller");
const attachResourceLoaders = require("@/utils/attachResourceLoaders");
const router = express.Router();

attachResourceLoaders(router, ["user"]);

router.get("/", usersController.index);
router.get("/:user", usersController.show);

module.exports = router;
