import asyncHandler from "express-async-handler";
import Task from "../model/taskModel.js";




// Create a new task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, deadline, priority } = req.body;

    if (!title || !deadline || !priority) {
        return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({ title, description, deadline, priority, createdBy: req.user._id, });
    res.status(201).json({ success: true, data: task });
});

// Get all tasks
const getAllTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user._id});
    res.status(200).json({ success: true, data: tasks });
});

// Get a single task by ID
const getTaskById = asyncHandler(async (req, res) => {
    // const { id } = req.params;

    const task = await Task.findById({ _id: req.params.id, createdBy: req.user._id });
    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
});

// Update a task by ID
const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, priority } = req.body;

    const task = await Task.findByIdAndUpdate(
        id,
        { title, description, deadline, priority },
        { new: true, runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: task });
});

// Delete a task by ID
const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
});

export { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
