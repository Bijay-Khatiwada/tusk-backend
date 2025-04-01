const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification-controller");
const upload = require("../multer");
const { isAdmin } = require("../middleware/middleware");

router.post('/create', upload.single('image'), notificationController.createNotification);

router.put('/update/:id', upload.single('image'), notificationController.updateNotification);

router.delete('/delete/:id', notificationController.deleteNotification);
router.get('/list', notificationController.listNotifications);
router.get('/list/:id', notificationController.getNotificationById);

//admin notification routes
router.delete("/admin/delete-notification/:id", isAdmin, notificationController.deleteNotification); //  Delete notification
router.put("/admin/update-notification/:id", isAdmin, upload.single('image'), notificationController.updateNotification); // 

module.exports = router;