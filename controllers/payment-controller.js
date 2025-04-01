const Car = require("../models/car.js");
const Transaction = require("../models/transaction-model.js");
const paymentService = require("../services/payment-services");

exports.processPayment = async (req, res) => {
    try {
        const { userId, carId, pickupDate, dropoffDate, totalAmount, paymentMethod } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required for payment." });
        }

        // ✅ Check if the car is available
        const car = await Car.findById(carId);
        if (!car) return res.status(404).json({ error: "Car not found" });
        if (car.status === "rented") return res.status(400).json({ error: "Car is already rented" });

        // ✅ Update car status to "rented"
        await Car.findByIdAndUpdate(carId, { status: "rented" });

        // ✅ Create a transaction record
        const transaction = new Transaction({ userId, carId, pickupDate, dropoffDate, totalAmount, paymentMethod });
        await transaction.save();

        res.json({ message: "Payment successful, car marked as rented!" });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: "Payment processing failed" });
    }
};


exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate("userId", "name email") // ✅ Show user details
            .populate("carId", "carModel location price"); // ✅ Show car details

        res.json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};
