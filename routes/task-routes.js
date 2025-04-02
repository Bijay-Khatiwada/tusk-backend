const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task-controller");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', taskController.createTask);

router.put('/update/:id', taskController.updateTask);

router.delete('/delete/:id', taskController.deleteTask);
router.get('/list', taskController.listTasks);
router.get('/list/:id', taskController.getTaskById);

//admin task routes
router.delete("/admin/delete-task/:id", isAdmin, taskController.deleteTask); //  Delete task
router.put("/admin/update-task/:id", isAdmin, taskController.updateTask); // 

module.exports = router;