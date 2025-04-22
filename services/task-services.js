
const TaskModel = require('../models/task.js');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



exports.listallTasks = async (userId = null, excludeUserId = null) => {
  try {
    let query = {};

    // Ensure excludeUserId is valid before using it
    if (excludeUserId && mongoose.Types.ObjectId.isValid(excludeUserId)) {
      query.$and = [
  { createdBy: { $ne: new mongoose.Types.ObjectId(excludeUserId) } },
  { assignedTo: { $ne: new mongoose.Types.ObjectId(excludeUserId) } }
];
 // Exclude logged-in user
    }

    console.log("Final Query being sent to MongoDB:", JSON.stringify(query, null, 2)); // Debugging log

    const tasks = await TaskModel.find(query).populate('createdBy', 'name').populate('assignedTo', 'name'); // Populate user name
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
exports.createTask = async (
  title,
  description,
  priority,
  createdAt,
  updatedAt,
  createdBy,
  assignedTo,
  status,
  condition,
  userId
) => {
  try {
    const newTask = new Task({
      title,
      description,
      priority,
      createdAt,
      updatedAt,
      createdBy,
      assignedTo,
      status, 
      condition,
      user: userId, // user who created the task
    });

    // Save the task to the database
    return await newTask.save();
  } catch (error) {
    console.error("Error saving task:", error);
    throw new Error('Error creating task: ' + error.message);
  }
}; 
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



exports.assignTask = async (taskId, assigneeId) => {
  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return null;
    }

    task.assignedTo = assigneeId;
    await task.save();

    return task;
  } catch (error) {
    console.error("Error assigning task:", error);
    throw new Error("Error assigning task: " + error.message);
  }
};

