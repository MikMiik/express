const express = require("express");
const usersController = require("@/controllers/admin/users.controller");
const usersValidator = require("@/validators/admin/users.validator");
const router = express.Router();

router.get("/", usersController.index);
router.post("/", usersValidator.createUser, usersController.store);
router.get("/create", usersController.create);
router.get("/:user", usersController.show);

module.exports = router;
