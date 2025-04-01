const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { isAdmin } = require("../middleware/middleware");


// Define your routes
router.post("/process", paymentController.processPayment);
router.get("/transactions", isAdmin, paymentController.getTransactions);


module.exports = router;






