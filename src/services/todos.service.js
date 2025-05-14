const { readDB, writeDB } = require("../utils/jsonDb");

const RESOURCE = "todos";

const getAllTodos = async (RESOURCE) => {
  const todos = await readDB(RESOURCE);
  return todos;
};

const getTodoById = async (id) => {
  const todos = await getAllTodos(RESOURCE);
  const todo = todos.find((todo) => todo.id === +id);
  return todo;
};

const createTodo = async (data) => {
  const todos = await getAllTodos(RESOURCE);
  const nextID = (todos.at(-1)?.id ?? 0) + 1;
  const newTodo = {
    id: nextID,
    ...data,
  };
  const newTodos = [...todos, newTodo];
  await writeDB(RESOURCE, newTodos);
  return newTodo;
};

const updateTodo = async (id, data) => {
  const todos = await getAllTodos(RESOURCE);
  let todoIndex = -1;
  const todoUpdate = todos.find((todo, index) => {
    if (todo.id === +id) {
      todoIndex = index;
      return true;
    }
    return false;
  });

  if (todoIndex === -1 || !todoUpdate) return;
  const updatedItem = { ...todoUpdate, ...data };
  const newTodos = [
    ...todos.slice(0, todoIndex),
    updatedItem,
    ...todos.slice(todoIndex + 1),
  ];
  await writeDB(RESOURCE, newTodos);
  return updatedItem;
};

const deleteTodo = async (id) => {
  const todos = await getAllTodos(RESOURCE);
  const todoDelete = todos.findIndex((todo) => todo.id === +id);

  if (todoDelete === -1) return;
  const newTodos = todos.filter((_, index) => index !== todoDelete);
  await writeDB(RESOURCE, newTodos);
  return true;
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
