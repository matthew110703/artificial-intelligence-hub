import { sendMail } from "../lib/emailConfig.js";
import { generate } from "otp-generator";

// Model
import OTP from "../models/otpModel.js";

/**
 * Generate OTP and send it to the user's email
 */
export const sendOtp = async (req, res, next) => {
  const { resend = false } = req.query;
  const { email } = req.body;

  try {
    // Validate the email
    if (!email) {
      throw {
        name: "Validation Error",
        message: "Email is required",
        statusCode: 400,
      };
    }

    // Check if the OTP already exists
    const existingOtp = await OTP.findOne({ email });
    if (existingOtp && !resend) {
      return res.status(400).json({
        success: false,
        message: "OTP already sent. Please check your email",
      });
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
 * Verify OTP
 */
export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    // Validate the email and OTP
    if (!email || !otp) {
      throw {
        name: "Validation Error",
        message: "Email and OTP are required",
        statusCode: 400,
      };
    }

    // Find the OTP
    const existingOtp = await OTP.findOne({ email, otp });
    if (!existingOtp) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid OTP or OTP might have expired. Please request a new OTP",
      });
    }

    // Delete the OTP from the database
    await OTP.findOneAndDelete({ email, otp });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
