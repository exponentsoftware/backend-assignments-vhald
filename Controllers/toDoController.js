const Todo = require("../Models/ToDoModel");

// Day 1 Todo List

//CREATE TODO
module.exports.createTodo = async (req, res) => {
    const newTodo = new Todo({
        username: req.body.username,
        title: req.body.title,
        category: req.body.category,
        completed: req.body.completed,
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// GET all
module.exports.getAllTodo = async (req, res) => {
    try {
        const todoAll = await Todo.find();
        res.status(200).json(todoAll);
    } catch (err) {
        res.status(500).json(err);
    }
};

//GET one
module.exports.getOneTodo = async (req, res) => {
    try {
        const todoOne = await Todo.findById(req.params.id);
        res.status(200).json(todoOne);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE todo

module.exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Todo.updateOne(
        { _id: id },
        {
            $set: req.body,
        }
    )
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Updated todo details successfully",
                result,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        });
};

//DELETE todo
module.exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        try {
            await todo.delete();
            res.status(200).json("todo has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};