const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const {isAdmin} = require('../middleware/middleware');


// Define your routes
router.post('/add-user', userController.createUser);
router.post('/login', userController.loginUser);
router.post("/admin/assign-role", isAdmin, userController.assignRole);
router.get("/list", isAdmin, userController.userlist); // ✅ New route to list users


module.exports = router;