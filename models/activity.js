const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String }, // e.g., "Task Created", "Status Updated"
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", ActivitySchema);