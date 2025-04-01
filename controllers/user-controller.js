// Import any required services or models here
const userService = require("../services/user-services");

// Define your controller methods

// List all users
exports.userlist = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const newUser = await userService.createUser(name, email, password);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login user and return JWT token
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // ✅ Get user and token from userService
    const { user, token } = await userService.loginUser(email, password);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Return user info + token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Ensure role is included
      },
      token, // ✅ Return JWT token
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Assign role to a user (Admin-only)
exports.assignRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // ✅ Only take userId from request body
    const adminId = req.userId; // ✅ Get admin ID from middleware

    console.log("Admin ID from Token:", adminId); // ✅ Debugging log
    console.log("Attempting to assign role:", role, "to user:", userId); // ✅ Debugging log

    // ✅ Ensure the role is valid
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Invalid role. Allowed roles: user, admin." });
    }

    // ✅ Update user role (middleware already validated admin)
    const result = await userService.assignUserRole(userId, role);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: `User role updated to ${role}` });

  } catch (error) {
    console.error("Error in assignRole:", error);
    res.status(500).json({ error: "Failed to assign role", message: error.message });
  }
};

exports.userlist = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
