
exports.listTasks = async (req, res) => {
  try {
    const { userId, excludeUserId } = req.query; // Extract userId and excludeUserId from query parameters
    const tasks = await taskService.listallTasks(userId, excludeUserId);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get a task by specific ID
exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new taskconst Task = require('../models/task'); // assuming the task model is in models/task.js
const User = require('../models/user.js'); // assuming the user model is in models/user.js
const taskService = require('../services/task-services'); // assuming task service contains logic for task operations

exports.createTask = async (req, res) => {
  try {
    // Destructure body params
    const { title, description, priority, createdAt, updatedAt, createdBy, assignedTo, status} = req.body;
    // Check if the assigned user exists (optional, you can skip this if it's not required)
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(404).json({ message: 'Assigned user not found' });
      }
    }
    // Use the taskService to create a new task
    const newTask = await taskService.createTask(
      title,
      description,
      priority,
      createdAt,
      updatedAt,
      createdBy,
      assignedTo,
      status
    );

    // Respond with the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const taskM = require('../models/task.js');
const mongoose = require('mongoose');
// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // FIX: Use 'id' instead of 'taskId'
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

    console.log("Fetching Task with ID:", id); // Debugging log

    const existingTask = await taskService.getTaskById(id);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await taskService.updateTask(id, updateData);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};