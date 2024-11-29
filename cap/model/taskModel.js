
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true }, // Add deadline field
  priority: { type: String, enum: ["low", "medium", "high"], required: true }, // Add priority field
  createdAt: { type: Date, default: Date.now },
    },
   
);


const Task = mongoose.model("Task", taskSchema);

export default Task;
