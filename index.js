const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config.js");
const upload = require("./multer.js");
// const paymentRoutes = require("../routes/payment-routes");here

const app = express();

//  Middleware Order is Important!
app.use(cors());
app.use(express.json()); //  JSON parser
app.use(express.urlencoded({ extended: true })); //  Needed for form data
app.use("/uploads", express.static("uploads")); //  Serve uploaded images

// ✅ Connect to MongoDB
mongoose.connect(config.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// ✅ Define Routes
app.use("/task", require("./routes/task-routes.js"));
app.use("/user", require("./routes/user-routes.js"));
app.use("/team", require("./routes/team-routes.js"));
// app.use("/comment", require("./routes/comment-routes.js"));
// app.use("/notification", require("./routes/notification-routes.js"));
// app.use("/project", require("./routes/project-routes.js"));
// app.use("/activity", require("./routes/activity-routes.js"));

// app.use("/payment", paymentRoutes);



app.listen(config.port, () => {
  console.log(`Server is running on http://127.0.0.1:${config.port}`);
});



