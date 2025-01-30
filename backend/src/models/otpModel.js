import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
    maxLength: [6, "OTP must be 6 characters long"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes
  },
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
