const Todo = require("../Models/ToDoModel");
const User = require("../Models/UserModel");

//CREATE TODO
module.exports.createTodo = async (req, res) => {
    const newTodo = new Todo({
        userId: req.user._id,
        title: req.body.title,
        category: req.body.category,
        completed: req.body.completed,
    });
    await newTodo.save().then((todos) => {
        User.findById(req.body.userId).then((user) => {
            user.todoList.push(todos._id)
            user.save()
        })

        return res.status(201).json({ message: "todo saved successfully." });
    })
        .catch((error) => {
            return res.status(500).json({ message: error.message });
        });
};

// GET all todo for a specific user
module.exports.getUserTodo = async (req, res) => {
    const id = req.user.id;
    await Todo.find({ userId: id }).populate('userId', 'userName')
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
};

// GET all todo for admin users
module.exports.getAdminTodo = async (req, res) => {
    await Todo.find().populate('userId', 'userName')
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })

}

//GET one
module.exports.getIdTodo = async (req, res) => {
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

// ---

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


// Completed Task (by Admin)
module.exports.updateStatusByAdmin = async (req, res) => {
    const id = req.params.id
    await Todo.updateOne({ _id: { $eq: id } }, { completed: true })
        .then((todo) => {
            res.status(200).json({ message: "task completed" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}



// Completed Task for non-Admins

module.exports.updateStatus = async (req, res) => {

    await Todo.findOne({ _id: req.params.id, userId: req.user._id }).then((isMatch) => {
        if (!isMatch) {
            return res.status(401).json({ message: 'You are not authorized' })
        } else {
            Todo.updateOne({ _id: { $eq: id } }, { status: "Done" })
                .then((todo) => {
                    res.status(200).json({ message: "Status updated to Done" })
                })
                .catch(err => {
                    res.status(500).json({ message: err.message })
                })
        }
    })

}

