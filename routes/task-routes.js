const express = require("express");
const router = express.Router();
const carController = require("../controllers/task-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), taskController.createCar);

router.put('/update/:id', upload.single('image'), taskController.updateCar);

router.delete('/delete/:id', taskController.deleteCar);
router.get('/list', taskController.listCars);
router.get('/list/:id', taskController.getCarById);

//admin car routes
router.delete("/admin/delete-car/:id", isAdmin, taskController.deleteCar); // ✅ Delete car
router.put("/admin/update-car/:id", isAdmin, upload.single('image'), taskController.updateCar); // ✅

module.exports = router;