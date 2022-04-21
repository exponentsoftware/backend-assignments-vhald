const mongoose = require('mongoose');
const User = require("./UserModel");


const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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