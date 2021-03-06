const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// day4 task
// Create api to get TODO list for User
module.exports.getAll = async (req, res) => {
    User.find().populate('todoList')
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