const { readDB, writeDB } = require("../utils/files.util");

const index = async (req, res) => {
  try {
    const todos = await readDB("todos");
    if (!todos) {
      return res.status(404).json({
        status: "Error",
        message: "Todo not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const show = async (req, res) => {
  try {
    const todos = await readDB("todos");
    const todo = todos.find((todo) => todo.id === +req.params.id);
    if (!todo) {
      return res.status(404).json({
        status: "Error",
        message: "Todo not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const store = async (req, res) => {
  try {
    const todos = await readDB("todos");
    let newTodo;
    if (req.body.task) {
      newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        task: req.body.task,
        done: req.body.done ?? false,
      };
    } else req.send("No task added");
    todos.push(newTodo);
    await writeDB("todos", todos);
    res.status(201).json({
      status: "Success",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const update = async (req, res) => {
  try {
    const todos = await readDB("todos");
    const todoUpdate = todos.findIndex((todo) => todo.id === +req.params.id);
    if (todoUpdate === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Todo not found",
      });
    }
    todos[todoUpdate].task = req.body.task ?? todos[todoUpdate].task;
    todos[todoUpdate].done = req.body.done ?? false;
    await writeDB("todos", todos);
    res.status(200).json({
      status: "Success",
      data: todos[todoUpdate],
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const todos = await readDB("todos");
    const todoDelete = todos.findIndex((todo) => todo.id === +req.params.id);
    if (todoDelete === -1) {
      return res.status(404).json({
        status: "Error",
        message: "Todo not found",
      });
    }
    todos.splice(todoDelete, 1);
    await writeDB("todos", todos);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Router not found",
    });
  }
};

module.exports = { index, show, store, update, destroy };
