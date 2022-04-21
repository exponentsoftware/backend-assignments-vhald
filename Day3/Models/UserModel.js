const mongoose = require('mongoose')

// User collection
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Please fill a valid email address']
    },
    phone: {
        type: Number,
        match: [/^(\+91)?(-)?\s*?(91)?\s*?([6-9]{1}\d{2})-?\s*?(\d{3})-?\s*?(\d{4})/, 'Please fill a valid phone no'],
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todoList: {
        type: Array
    }
}, { timestamps: true })

module.exports = mongoose.models.User || mongoose.model("User", userSchema)