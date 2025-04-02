const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true } , 
    description: {type: String, required: true},
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    createdBy: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedTo: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ["ToDo", "InProgress", "Completed"], default: "ToDo" },
    // condition: {type:String, required: true},
    // user: String,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;