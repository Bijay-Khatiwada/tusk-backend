
const TaskModel = require('../models/task.js');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



exports.listallTasks = async (userId = null, excludeUserId = null) => {
  try {
    let query = {};

    // Ensure excludeUserId is valid before using it
    if (excludeUserId && mongoose.Types.ObjectId.isValid(excludeUserId)) {
      query.user = { $ne: new mongoose.Types.ObjectId(excludeUserId) }; // Exclude logged-in user
    }

    console.log("Final Query being sent to MongoDB:", JSON.stringify(query, null, 2)); // Debugging log

    const tasks = await TaskModel.find(query).populate('user', 'name'); // Populate user name
    console.log("Tasks returned from MongoDB:", tasks); // Log the actual data

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Error fetching tasks");
  }
};





// Get a task by ID
exports.getTaskById = async (id) => {
  try {
    const task = await TaskModel.findById(id).select('-user'); // Exclude user details
    if (!task) throw new Error("Task not found");
    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};

// Create a new task
exports.createTask = async (
  TaskModel,
  location,
  price,
  image,
  description,
  pickupdate,
  dropoffdate,
  userId,
  condition
) => {
  try {
    const newTask = new TaskModel({
      TaskModel,
      location,
      price,
      image,
      description,
      pickupdate,
      dropoffdate,
      user: userId,
      condition,
    });

    return await newTask.save();
  } catch (error) {
    console.error("Error saving task:", error);
    throw error;
  }
};

// Update an existing task
exports.updateTask = async (
  id,
  TaskModel,
  location,
  price,
  image,
  description,
  pickupdate,
  dropoffdate,
  userId,
  condition
) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        TaskModel,
        location,
        price,
        image,
        description,
        pickupdate,
        dropoffdate,
        user: userId,
        condition,
      },
      { new: true } // Return the updated document
    );

    if (!updatedTask) throw new Error("Task not found");
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
exports.deleteTask = async (id) => {
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) throw new Error("Task not found");
    return deletedTask;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
