import { sendMail } from "../lib/emailConfig.js";
import { generate } from "otp-generator";

// Model
import OTP from "../models/otpModel.js";
import User from "../models/userModel.js";

/**
 * Generate OTP and send it to the user's email
 */
export const sendOtp = async (req, res, next) => {
  const { resend = false, signup = true } = req.query;
  const { email } = req.body;

  try {
    // Validate the email
    if (!email || !email.includes("@")) {
      throw {
        name: "ValidationError",
        message: "Email is required",
        statusCode: 400,
      };
    }

    // Check if the user exists
    if (signup) {
      const user = await User.findOne({ email });
      if (user) {
        throw {
          name: "ValidationError",
          message: "User already exists",
          statusCode: 400,
        };
      }
    }

    // Check if the OTP already exists
    const existingOtp = await OTP.findOne({ email });
    if (existingOtp && !resend) {
      throw {
        name: "ValidationError",
        message: "OTP already sent. Please check your email",
        statusCode: 400,
      };
    } else if (existingOtp && resend) {
      // Delete the existing OTP
      await OTP.findOneAndDelete({ email });
    }

    // Generate OTP
    const otp = generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // Send OTP to the user's email
    await sendMail(email, otp);

    // Save the OTP to the database
    await OTP.create({ email, otp });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**
 * Verify OTP Middleware
 */
export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    // Validate the email and OTP
    if (!email || !email.includes("@") || !otp) {
      throw {
        name: "ValidationError",
        message: "Email and OTP are required",
        statusCode: 400,
      };
    }

    // Find the OTP
    const existingOtp = await OTP.findOne({ email, otp });
    if (!existingOtp) {
      throw {
        name: "VerificationError",
        message: "Invalid OTP",
        statusCode: 400,
      };
    }

    // Delete the OTP from the database
    await OTP.findOneAndDelete({ email, otp });

    // Set the user as verified
    req.verified = true;
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
