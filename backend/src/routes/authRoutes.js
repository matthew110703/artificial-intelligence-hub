import { Router } from "express";

// Controllers
import { sendOtp, verifyOtp } from "../controllers/otpController.js";
import {
  signUp,
  signIn,
  resetPassword,
} from "../controllers/authController.js";

const authRoutes = Router();

// Send OTP
authRoutes.post("/send-otp", sendOtp);
authRoutes.post("/sign-up", verifyOtp, signUp);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/reset-password", verifyOtp, resetPassword);

export default authRoutes;
