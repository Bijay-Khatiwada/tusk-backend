const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const taskController = require("../controllers/task-controller"); // Import task controller
const {
  isAdmin,
  isAuthenticated,
  isProjectManager,
  isTeamLead,
  isQA,
  isObserver
} = require("../middleware/middleware");

// Admin-only routes
router.post("/add-user",  userController.createUser); // Admin creates a new user
router.post("/admin/assign-role", isAdmin, userController.assignRole); // Admin assigns roles to users

// Public login route
router.post("/login", userController.loginUser); 

// Authenticated routes (accessible to all logged-in users)
router.get("/list", isAuthenticated, userController.userlist); // Get all users, accessible by all logged-in users

// ProjectManager & TeamLead routes
router.post("/create-task", isProjectManager, taskController.createTask); // Now referencing taskController

// TeamLead routes
router.post("/assign-task", isTeamLead, taskController.assignTask); // Now referencing taskController

// QA routes
router.get("/qa-view-tasks", isQA, taskController.listTasks); // Only QA users can view tasks for QA

// Observer routes
router.get("/observer-tasks", isObserver, taskController.listTasks); // Observers can view tasks, no editing

module.exports = router;