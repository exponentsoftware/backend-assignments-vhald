const mongoose = require('mongoose');

const todoList = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["work", "hobby", "task"],
        default: "task"
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Todo", todoList); 