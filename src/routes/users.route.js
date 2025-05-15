const express = require("express");
const router = express.Router();

const attachResourceLoaders = require("@/utils/attachResourceLoaders");
const usersController = require("@/controllers/users.controller");

attachResourceLoaders(router, ["user"]);

// Users
router.get("/", usersController.getList);
router.get("/:user", usersController.getOne);
router.post("/", usersController.create);
router.put("/:user", usersController.update);
router.patch("/:user", usersController.update);
router.delete("/:user", usersController.remove);

// Users comments
router.get("/:user/comments", usersController.getUserComments);

module.exports = router;
