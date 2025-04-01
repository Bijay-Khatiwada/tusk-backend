const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../config/config");
const upload = require("../multer");
// const paymentRoutes = require("../routes/payment-routes");here

const app = express();

// ✅ Middleware Order is Important!
app.use(cors());
app.use(express.json()); // ✅ JSON parser
app.use(express.urlencoded({ extended: true })); // ✅ Needed for form data
app.use("/uploads", express.static("uploads")); // ✅ Serve uploaded images

// ✅ Connect to MongoDB
mongoose.connect(config.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// ✅ Define Routes
app.use("/task", require("../routes/task-routes"));
app.use("/user", require("../routes/user-routes"));


// ✅ Use Payment Routes
app.use("/payment", paymentRoutes);
app.use("/payment2", paymentRoutes);


app.listen(config.port, () => {
  console.log(`Server is running on http://127.0.0.1:${config.port}`);
});


// ✅ Define Routes here
// app.use("/cars", require("../routes/car-routes"));


