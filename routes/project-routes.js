const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), projectController.createProject);

router.put('/update/:id', upload.single('image'), projectController.updateProject);

router.delete('/delete/:id', projectController.deleteProject);
router.get('/list', projectController.listProjects);
router.get('/list/:id', projectController.getProjectById);

//admin project routes
router.delete("/admin/delete-project/:id", isAdmin, projectController.deleteProject); //  Delete project
router.put("/admin/update-project/:id", isAdmin, upload.single('image'), projectController.updateProject); // 

module.exports = router;