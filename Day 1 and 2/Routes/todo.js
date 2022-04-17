const express = require("express");

//controllers
const Todo = require("../Controllers/toDoController");

const router = express.Router();

// Day 1 : basic crud

router.get("/", Todo.getAllTodo);
router.get("/:id", Todo.getOneTodo);
router.post("/add", Todo.createTodo);
router.put("/:id", Todo.updateTodo);
router.delete("/:id", Todo.deleteTodo);

// Day 2 : filtering the data

router.get('/categorywise/:category', Todo.fetchByCategory)
router.get('/titlewise/:title', Todo.fetchByTitle)
router.get('/sort/sortMe', Todo.sortTodo)
router.patch('/updateStatus/:id', Todo.updateStatus)

// Day 3 : 

module.exports = router;