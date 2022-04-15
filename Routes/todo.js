const express = require("express");

//controllers
const Todo = require("../Controllers/toDoController");

const router = express.Router();

// Day 1 Todo List
router.get("/", Todo.getAllTodo);
router.get("/:id", Todo.getOneTodo);
router.post("/addTodo", Todo.createTodo);
router.put("/:id", Todo.updateTodo);
router.delete("/:id", Todo.deleteTodo);

module.exports = router;