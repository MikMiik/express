const express = require("express");
const router = express.Router();
const {
  createTodoValidator,
  updateTodoValidator,
} = require("@/validation/todos.validator");

const {
  index,
  show,
  store,
  update,
  destroy,
} = require("../controllers/todos.controller");

router.get("/", index);
router.get("/:id", show);
router.post("/", createTodoValidator, store);
router.put("/:id", updateTodoValidator, update);
router.patch("/:id", updateTodoValidator, update);
router.delete("/:id", destroy);

module.exports = router;
