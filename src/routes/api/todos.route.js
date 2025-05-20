const express = require("express");
const router = express.Router();
const {
  createTodoValidator,
  updateTodoValidator,
} = require("@/validators/todos.validator");

const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../../controllers/api/todos.controller");

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodoValidator, createTodo);
router.put("/:id", updateTodoValidator, updateTodo);
router.patch("/:id", updateTodoValidator, updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
