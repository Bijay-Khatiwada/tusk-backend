
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
    // Ensure the image is provided (if that's part of the task requirements)

    // Destructure body params
    const { title, description, priority, createdAt, updatedAt, createdBy, assignedTo, status} = req.body;
    

    // Check if the user who created the task exists
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ message: 'User not found' });
    // }

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

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Task ID:", id);

    const task = await TaskModel.findById(id);
    if (!task) {
      console.log("Task not found.");
      return res.status(404).json({ message: 'Task not found' });
    }

    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    const { taskModel, location, price, description, pickupdate, dropoffdate, userId, condition } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ message: 'User not found' });
    }


    const imagePath = req.file ? `/uploads/${req.file.filename}` : task.image;
    console.log("Image Path:", imagePath);

    const updatedTask = await taskService.updateTask(
      id,
      taskModel,
      location,
      price,
      imagePath,
      description,
      pickupdate,
      dropoffdate,
      userId,
      condition
    );

    console.log("Updated Task:", updatedTask);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: 'Internal Server Error' });
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