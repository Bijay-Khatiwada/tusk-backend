const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), activityController.createActivity);

router.put('/update/:id', upload.single('image'), activityController.updateActivity);

router.delete('/delete/:id', activityController.deleteActivity);
router.get('/list', activityController.listActivitys);
router.get('/list/:id', activityController.getActivityById);

//admin activity routes
router.delete("/admin/delete-activity/:id", isAdmin, activityController.deleteActivity); //  Delete activity
router.put("/admin/update-activity/:id", isAdmin, upload.single('image'), activityController.updateActivity); // 

module.exports = router;