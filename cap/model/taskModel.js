
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true }, // Add deadline field
  priority: { type: String, enum: ["low", "medium", "high"], required: true }, // Add priority field
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
   
);


const Task = mongoose.model("Task", taskSchema);

export default Task;
