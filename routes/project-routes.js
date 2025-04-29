const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");
const { isAuthenticated, isAdmin, isProjectManager, isTeamLead } = require("../middleware/middleware");  // Import role-based middleware

// Basic project routes with RBAC
router.post('/create', isAuthenticated, isProjectManager, projectController.createProject);  // Only ProjectManager and Admin can create projects
router.put('/update/:id', isAuthenticated, isTeamLead, projectController.updateProject);  // Only ProjectManager and Admin can update projects
router.delete('/delete/:id', isAuthenticated, isAdmin, projectController.deleteProject);  // Only Admin can delete projects
router.get('/list', isAuthenticated, projectController.getAllProjects);  // Everyone can list projects
router.get('/list/:id', isAuthenticated, projectController.getProjectById);  // Everyone can get project by ID

module.exports = router;
