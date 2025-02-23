import { Router } from "express";

// Controllers
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import {
  signUp,
  signIn,
  resetPassword,
  checkAvailability,
} from "../controllers/authController.js";

const authRoutes = Router();

// Send OTP
authRoutes.post("/send-otp", sendOtp);
authRoutes.post("/signup", verifyOtp, signUp);
authRoutes.post("/signin", signIn);
authRoutes.post("/reset-password", verifyOtp, resetPassword);
authRoutes.post("/check-availability", checkAvailability);

export default authRoutes;
