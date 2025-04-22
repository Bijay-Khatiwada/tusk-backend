const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.js");
require("dotenv").config(); // Ensure environment variables are loaded

// Define your service methods

// List all users
exports.listUsers = async () => {
  return await UserModel.find({}, "name email role"); // Fetch only necessary fields
};

// User login with JWT token generation
exports.loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate JWT Token
  const token = jwt.sign(
    { userId: user._id, role: user.role }, // Store userId & role in token
    process.env.JWT_SECRET, // Use a secret key stored in .env
    { expiresIn: "1h" } // Token expires in 1 hour
  );

  return { user, token }; // Return token along with user data
};

// Get a user by ID
exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

// Create a new user with a role (default role is 'user' unless specified)
exports.createUser = async (name, email, password, role = "user") => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const newUser = new UserModel({
      name, 
      email, 
      password, 
      role // Accept role from request body with fallback to "user"
    });

    return await newUser.save();
  } catch (error) {
    console.error(error);
    throw error; // pass it up to the controller
  }
};

// Update user details
exports.updateUser = async (id, updates) => {
  return await UserModel.updateOne({ _id: id }, { $set: updates });
};

// Delete a user by ID
exports.deleteUser = async (id) => {
  return await UserModel.deleteOne({ _id: id });
};

// Assign a role to a user (Admin-only functionality)
// Function to assign a new role to a user (Admin functionality)
exports.assignUserRole = async (userId, role) => {
  // Ensure the role is one of the valid ones
  const validRoles = ['Standard', 'ProjectManager', 'TeamLead', 'QA', 'Observer'];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  // Update the user’s role in the database
  const result = await UserModel.updateOne(
    { _id: userId },
    { $set: { role: role } }
  );

  return result; // This will return the result of the update operation
};
