
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
    const task = await TaskModel.findById(id).select('-user').lean(); // Exclude user details and improve performance

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error; // Re-throw so the controller can handle it
  }
};


// Create a new task
const Task = require('../models/task'); // assuming task model is in models/task.js

exports.updateTask = async (taskId, updateData) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true, // Return updated document
      runValidators: true, // Ensure updated data follows schema rules
    });

    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error('Error updating task: ' + error.message);
  }
};


// exports.updateTask = async (
//   id,
//   location,
//   price,
//   image,
//   description,
//   pickupdate,
//   dropoffdate,
//   userId,
//   condition
// ) => {
//   try {
//     console.log("Updating task with ID:", id);

//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       id,
//       {
//         location,
//         price,
//         image,
//         description,
//         pickupdate,
//         dropoffdate,
//         user: userId,
//         condition,
//       },
//       { new: true } // ✅ Ensure the updated task is returned
//     );

//     if (!updatedTask) throw new Error("Task not found");
//     return updatedTask;
//   } catch (error) {
//     console.error("Error updating task:", error);
//     throw error;
//   }
// };
exports.updateTask = async (id, updateData) => {
  try {
    console.log("Updating task with ID:", id);

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      updateData, // Use the entire updateData object here
      { new: true } // ✅ Ensure the updated task is returned
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
