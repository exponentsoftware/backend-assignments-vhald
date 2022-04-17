const Todo = require("../Models/ToDoModel");

// Day 1 Todo List

//CREATE TODO
module.exports.createTodo = async (req, res) => {
    // const { username, title, completed, category } = req.body
    // if (!username || !title || !completed || !category) {
    //     return res.status(400).json({ message: "please enter all fields" });
    // }
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
        await Todo.find()
            .then((todos) => {
                res.status(200).json(todos)
            })
    }
    catch (err) {
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

// --- DAY 2 ----

// fetch by category name
module.exports.fetchByCategory = async (req, res) => {
    const category = req.params.category
    await Todo.find({ category: category })
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

// fetch By Title name
module.exports.fetchByTitle = async (req, res) => {
    const title = req.params.title
    await Todo.find({ title: title })
        .then(todo => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

// sorting by createdAt
module.exports.sortTodo = async (req, res) => {
    try {
        await Todo.find()
            .sort({ createdAt: -1 }) // latest first sorting
            .then((todos) => {
                res.status(200).json(todos)
            })
    }
    catch (err) {
        res.status(500).json(err);
    }
};


// Completed Task
module.exports.updateStatus = async (req, res) => {
    const id = req.params.id
    await Todo.updateOne({ _id: { $eq: id } }, { completed: true })
        .then((todo) => {
            res.status(200).json({ message: "task completed" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

