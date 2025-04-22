// Import any required services or models here
const userService = require("../services/user-services");
const jwt = require('jsonwebtoken');

// Make sure to access your secret from the environment variable
const jwtSecret = process.env.JWT_SECRET;

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

// Create a new user (with role selection)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Add role to the destructuring

    // Call the service method to create the user
    const newUser = await userService.createUser(name, email, password, role);

    // Sign the JWT token for the user
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role }, // Include role in the payload
      jwtSecret, 
      { expiresIn: '1h' }
    );

    // Return the new user and token in the response
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login user and return JWT token with role
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { user, token } = await userService.loginUser(email, password);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user info including role and token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role here
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Admin-only route to assign a role to a user
exports.assignRole = async (req, res) => {
  try {
    const { userId, role } = req.body; // Get userId and role from request body
    const adminId = req.userId; // Get the admin ID from the token payload

    // Check if the role provided is valid
    const validRoles = ['Standard', 'ProjectManager', 'TeamLead', 'QA', 'Observer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role. Allowed roles: Standard, ProjectManager, TeamLead, QA, Observer." });
    }

    // Update the user role using the user service
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
