const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");
const { isAuthenticated, isAdmin, isProjectManager, isTeamLead, isQA, isObserver } = require("../middleware/middleware");

// Routes for task management
router.post('/create', isAuthenticated, isProjectManager, taskController.createTask); // ProjectManager and Admins only
router.put('/update/:id', isAuthenticated, isTeamLead, taskController.updateTask); // TeamLead and Admins only
router.delete('/delete/:id', isAuthenticated, isAdmin, taskController.deleteTask); // Admins only
router.post("/assign-task", isAuthenticated, isTeamLead, taskController.assignTask);

// Routes for viewing tasks (QA and Observers can view tasks)
router.get('/list', isAuthenticated, taskController.listTasks); // All authenticated users can list tasks
router.get('/list/:id', isAuthenticated, taskController.getTaskById); // Any authenticated user can view a task

// Admin task routes for managing tasks
router.delete("/admin/delete-task/:id", isAuthenticated, isAdmin, taskController.deleteTask); // Admin only
router.put("/admin/update-task/:id", isAuthenticated, isAdmin, taskController.updateTask); // Admin only

module.exports = router;
