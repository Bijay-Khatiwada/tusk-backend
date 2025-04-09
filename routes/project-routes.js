const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");
// const { isAdmin } = require("../middleware/middleware");
// const { validateProject } = require("../middleware/validation");

// Basic project routes
router.post('/create', validateProject, projectController.createProject);
router.put('/update/:projectId', validateProject, projectController.updateProject);
router.delete('/delete/:projectId', isAdmin, projectController.deleteProject); // Added isAdmin middleware
router.get('/list', projectController.listProjects);
router.get('/list/:projectId', projectController.getProjectById);

// Admin project routes
// router.delete("/admin/delete-project/:projectId", isAdmin, projectController.adminDeleteProject);
// router.put("/admin/update-project/:projectId", isAdmin, projectController.adminUpdateProject);

module.exports = router;