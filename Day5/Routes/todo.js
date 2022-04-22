const express = require("express");
const router = express.Router();

//controllers
const Todo = require("../Controllers/toDoController");

// middlewares
const userAuth = require("../Middleware/user");
const adminAuth = require("../Middleware/admin");




// Only signed In user can only be able to call the routes
router.post('/add', userAuth, Todo.createTodo)
router.get('/showTodo', userAuth, Todo.getUserTodo);
router.get('/showAdminTodo', adminAuth, Todo.getAdminTodo);
router.get('/getOne/:id', userAuth, Todo.getIdTodo)
router.put('/updateOne/:id', userAuth, Todo.updateTodo)
router.delete('/deleteOne/:id', userAuth, Todo.deleteTodo)

//day2 routes

router.get('/categorywise/:category', adminAuth, Todo.fetchByCategory)
router.get('/titlewise/:title', adminAuth, Todo.fetchByTitle)
router.get('/sortByDate', adminAuth, Todo.sortTodo)
router.patch('/updateStatus/:id', adminAuth, Todo.updateStatus)
router.patch('/updateStatusByAdmin/:id', adminAuth, Todo.updateStatusByAdmin)


module.exports = router;