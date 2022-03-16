const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true,
    },
    task_time: {
        type: String,
        required: true,
    },
    task_compeleted: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;