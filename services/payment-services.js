const Car = require("../models/car.js");
const Transaction = require("../models/transaction-model.js");

exports.processTransaction = async (userId, carId, pickupDate, dropoffDate, totalAmount, paymentMethod) => {
    // ✅ Update car status to "rented"
    await Car.findByIdAndUpdate(carId, { status: "rented" });

    // ✅ Create a transaction record
    const transaction = new Transaction({ userId, carId, pickupDate, dropoffDate, totalAmount, paymentMethod });
    await transaction.save();
};
