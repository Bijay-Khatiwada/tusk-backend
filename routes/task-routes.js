const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), taskController.createTask);

router.put('/update/:id', upload.single('image'), taskController.updateTask);

router.delete('/delete/:id', taskController.deleteTask);
router.get('/list', taskController.listTasks);
router.get('/list/:id', taskController.getTaskById);

//admin task routes
router.delete("/admin/delete-task/:id", isAdmin, taskController.deleteTask); //  Delete task
router.put("/admin/update-task/:id", isAdmin, upload.single('image'), taskController.updateTask); // 

module.exports = router;