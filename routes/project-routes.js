const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");
//middleware
//multer
// Basic project routes
router.post('/create',  projectController.createProject);
router.put('/update/:projectId',  projectController.updateProject);  
router.delete('/delete/:id',  projectController.deleteProject); 
router.get('/list', projectController.getAllProjects);
router.get('/list/:projectId', projectController.getProjectById);

//admin

module.exports = router;