const express = require("express");

const {
  getUsers,
  getUser,
  createUser,
} = require("../controllers/users.controller");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
// router.put("/:id", updatePost);
// router.patch("/:id", updatePost );
// router.delete("/:id", deletePost);

module.exports = router;
