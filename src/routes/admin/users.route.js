const express = require("express");
const router = express.Router();
const handleUpload = require("@/middlewares/admin/handleUpload");

const usersController = require("@/controllers/admin/users.controller");
const usersValidator = require("@/validators/admin/users.validator");

router.get("/", usersController.index);
router.post(
  "/",
  handleUpload.single("avatar"),
  usersValidator.createUser,
  usersController.store,
);
router.get("/create", usersController.create);
router.get("/:id/edit", usersController.edit);
router.delete("/:id/force-delete", usersController.forceDelete);
router.put(
  "/:id",
  handleUpload.single("avatar"),
  usersValidator.updateUser,
  usersController.update,
);
router.get("/:id", usersController.show);

module.exports = router;
