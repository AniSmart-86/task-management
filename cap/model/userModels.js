import mongoose, { Schema } from "mongoose";
import validator from "validator";

const {objectId} = Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
 
);

// Index to enforce unique emails in MongoDB
userSchema.index({ email: 1 }, { unique: true });

// Password encryption
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const bcrypt = await import("bcryptjs");
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Create model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
