const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ["ToDo", "InProgress", "Completed"], default: "ToDo" },
}, {
    timestamps: true // ✅ this auto-adds createdAt and updatedAt
});


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;