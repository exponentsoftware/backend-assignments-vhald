const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Todo = require('../models/ToDoModel');

// TODO list with pagination
// Add Pagination on all get routes
module.exports.getAll = async (req, res) => {
    //pagination part limiting and control the data using page and limit

    // changed to params because query was giving errors
    let { page = 1, limit = 10 } = req.params;
    page = parseInt(page)
    limit = parseInt(limit)
    User.find().populate('todoList')
        .skip((page - 1) * limit)
        .limit(limit)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}



// Create a new user
module.exports.addUser = async (req, res) => {
    const { userName, email, phone, role, password } = req.body
    if (!userName || !email || !phone || !role || !password) {
        return res.status(400).json('All fields required')
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                return res.status(400).json({ message: ' user already registered' })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        } else {
                            const newUser = new User({
                                userName: userName,
                                email: email,
                                phone: phone,
                                role: role,
                                password: hash
                            })
                            newUser.save()
                                .then((user) => {
                                    res.status(200).json({ user: user, message: 'user saved successfully' })
                                })
                                .catch(err => {
                                    res.status(500).json({ message: err.message })
                                })
                        }
                    })
                })
            }
        })
    }
}

// signIn
module.exports.getLogIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields required' })
    } else {
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                res.status(400).json({ message: 'User not exist Please signIn' })
            } else {
                bcrypt.compare(password, user.password,).then((isMatch) => {
                    if (!isMatch) {
                        res.status(401).json({ message: 'Email id or password incorrect' })
                    } else {
                        jwt.sign(
                            { id: user._id },
                            process.env.JWT_KEY,
                            {
                                expiresIn: 3600  // 1 hour
                            },
                            (err, token) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.status(200).json({
                                        message: 'Login successfully',
                                        token: token
                                    })
                                }
                            }
                        )
                    }
                })
            }
        })
    }
}

// getting info of an user (admin)
module.exports.getOneUser = async (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

// update one user (admin)
module.exports.updateOneUser = async (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body, { useFindandModify: false })
        .then(() => {
            res.status(200).json({ message: "user details updated successfully" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


// Delete a user (admin)
module.exports.deleteOneUser = async (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "user delete successfully" })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


// -- pagination Day 5 - 

// Add Pagination on all get routes - done
// Api should be able to take in two fields - page number and no. of records - done
// Pagination should work with existing features  - done
// Create an API to get number of registered users for the Day  - done
// Create API to get active users for the below:
// for current day
// for a week
// for a month



// number of registered users for the Day
// used params because query was throwing error
module.exports.todayRegistered = async (req, res) => {
    //const todayDate = new Date()
    let { page = 1, limit = 10 } = req.params;
    page = parseInt(page)
    limit = parseInt(limit)
    User.find({
        createdAt: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 1))
        }
    })
        .skip((page - 1) * limit)
        .limit(limit)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


// active users for a today
module.exports.todayActive = async (req, res) => {
    let { page = 1, limit = 10 } = req.params;
    page = parseInt(page)
    limit = parseInt(limit)
    await Todo.aggregate([{ $match: { updatedAt: { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } } }, { $project: { userId: 1 } }])
        .skip((page - 1) * limit)
        .limit(limit)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


// active users for a week
module.exports.weekActive = async (req, res) => {
    let { page = 1, limit = 10 } = req.params;
    page = parseInt(page)
    limit = parseInt(limit)
    await Todo.aggregate([{ $match: { updatedAt: { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } } }, { $project: { userId: 1 } }])
        .skip((page - 1) * limit)
        .limit(limit)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

// active users for a month
module.exports.monthActive = async (req, res) => {
    let { page = 1, limit = 10 } = req.params;
    page = parseInt(page)
    limit = parseInt(limit)
    await Todo.aggregate([{ $match: { updatedAt: { $lt: new Date(), $gte: new Date(new Date().setDate(new Date().getDate() - 30)) } } }, { $project: { userId: 1 } }])
        .skip((page - 1) * limit)
        .limit(limit)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


