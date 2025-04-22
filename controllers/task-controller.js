// task-controller.js

const User = require("../models/user");
const taskService = require("../services/task-services");
const mongoose = require("mongoose");

exports.listTasks = async (req, res) => {
  try {
    const { userId, excludeUserId } = req.query;
    const tasks = await taskService.listallTasks(userId, excludeUserId);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new task (only ProjectManagers and Admins can create tasks)
exports.createTask = async (req, res) => {
  try {
    // Check if the user has the correct role to create tasks
    if (req.userRole !== "ProjectManager" && req.userRole !== "Admin") {
      return res.status(403).json({ error: "Access Denied. Only Project Managers and Admins can create tasks." });
    }

    const { title, description, priority, assignedTo, status } = req.body;

    // Check if the assigned user exists
    if (assignedTo) {
      const assignedUser = await User.findById(assignedTo);
      if (!assignedUser) {
        return res.status(404).json({ message: 'Assigned user not found' });
      }
    }

    // Use the taskService to create a new task
    const newTask = await taskService.createTask(title, description, priority, assignedTo, status, req.userId);

    // Respond with the newly created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a task (only TeamLeads and Admins can update tasks)
exports.updateTask = async (req, res) => {
  try {
    // Only TeamLeads and Admins can update tasks
    if (req.userRole !== "TeamLead" && req.userRole !== "Admin") {
      return res.status(403).json({ error: "Access Denied. Only Team Leads and Admins can update tasks." });
    }

    const { id } = req.params; 
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Task ID" });
    }

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

// Delete a task (only Admins can delete tasks)
exports.deleteTask = async (req, res) => {
  try {
    // Only Admins can delete tasks
    if (req.userRole !== "Admin") {
      return res.status(403).json({ error: "Access Denied. Only Admins can delete tasks." });
    }

    const { id } = req.params;
    const deletedTask = await taskService.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.assignTask = async (req, res) => {
  try {
    const { taskId, assigneeId } = req.body;

    if (!taskId || !assigneeId) {
      return res.status(400).json({ message: "Task ID and assignee ID are required." });
    }

    const updatedTask = await taskService.assignTask(taskId, assigneeId);

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or update failed." });
    }

    res.status(200).json({ message: "Task assigned successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error: error.message });
  }
};

