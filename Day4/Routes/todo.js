const express = require("express");
const router = express.Router();

//controllers
const Todo = require("../Controllers/toDoController");

// middlewares
const userAuth = require("../Middleware/user");
const adminAuth = require("../Middleware/admin");

// passport config
const passport = require("Passport");
require("../Middleware/admin")(passport);


// Only signed In user can only be able to call the routes
router.post('/add', passport.authenticate('jwt', { session: false }), Todo.createTodo)
router.get('/showTodo', passport.authenticate('jwt', { session: false }), Todo.getUserTodo);
router.get('/getOne/:id', passport.authenticate('jwt', { session: false }), Todo.getIdTodo)
router.put('/updateOne/:id', passport.authenticate('jwt', { session: false }), Todo.updateTodo)
router.delete('/deleteOne/:id', passport.authenticate('jwt', { session: false }), Todo.deleteTodo)

//day2 routes

router.get('/categorywise/:category', passport.authenticate('jwt', { session: false }), Todo.fetchByCategory)
router.get('/titlewise/:title', passport.authenticate('jwt', { session: false }), Todo.fetchByTitle)
router.get('/sortByDate', passport.authenticate('jwt', { session: false }), Todo.sortTodo)
router.patch('/updateStatus/:id', passport.authenticate('jwt', { session: false }), Todo.updateStatus)
router.patch('/updateStatusByAdmin/:id', passport.authenticate('jwt', { session: false }), Todo.updateStatusByAdmin)


module.exports = router;