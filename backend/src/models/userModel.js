import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minLength: [3, "Username must be at least 5 characters long"],
      maxLength: [20, "Username must be at most 20 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    firstname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters long"],
      maxLength: [20, "First name must be at most 20 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minLength: [3, "Last name must be at least 3 characters long"],
      maxLength: [20, "Last name must be at most 20 characters long"],
    },
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
      enum: ["Work", "Personal", "School"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
