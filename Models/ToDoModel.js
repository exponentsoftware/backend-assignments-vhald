const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
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

module.exports = mongoose.model("Todo", todoSchema); 