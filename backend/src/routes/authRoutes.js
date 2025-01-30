import { Router } from "express";

// Controllers
import { sendOtp, verifyOtp } from "../controllers/otpController.js";

const authRoutes = Router();

// Send OTP
authRoutes.post("/send-otp", sendOtp);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;
