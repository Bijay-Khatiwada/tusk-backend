const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Team creator
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users in the team
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // Projects linked to the team
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Team", TeamSchema);
