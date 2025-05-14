const todosService = require("@/services/todos.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

const getAllTodos = async (req, res) => {
  const todos = await todosService.getAllTodos("todos");
  if (!todos) throw404();
  response.success(res, 200, todos);
};

const getTodoById = async (req, res) => {
  const todo = await todosService.getTodoById(req.params.id);
  if (!todo) throw404();
  response.success(res, 200, todo);
};

const createTodo = async (req, res) => {
  const newTodo = await todosService.createTodo(req.body);
  response.success(res, 201, newTodo);
};

const updateTodo = async (req, res) => {
  const updatedItem = await todosService.updateTodo(req.params.id, req.body);
  if (!updatedItem) throw404();
  response.success(res, 200, updatedItem);
};

const deleteTodo = async (req, res) => {
  const result = await todosService.deleteTodo(req.params.id);
  if (!result) throw404();
  res.status(200).send();
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
