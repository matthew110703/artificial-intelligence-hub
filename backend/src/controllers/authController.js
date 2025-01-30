import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Models
import User from "../models/userModel.js";

// Helper functions
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Sign up a new user
 */
export const signUp = async (req, res, next) => {
  try {
    // Check for verification
    if (!req.verified) {
      throw {
        name: "VerificationError",
        message: "Please verify email before signing up",
        statusCode: 400,
      };
    }

    // Check if the user already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      throw {
        name: "UserExists",
        message: "User already exists",
        statusCode: 400,
      };
    }

    // Create a new user
    const user = await User.create({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    // Generate token
    const token = generateToken({ _id: user._id, username: user.username });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sign in a user
 */
export const signIn = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!user) {
      throw {
        name: "AuthenticationError",
        message: "Invalid credentials",
        statusCode: 401,
      };
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      throw {
        name: "AuthenticationError",
        message: "Invalid credentials",
        statusCode: 401,
      };
    }

    // Generate token
    const token = generateToken({ _id: user._id, username: user.username });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 */
export const resetPassword = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (!user) {
      throw {
        name: "AuthenticationError",
        message: "Invalid username or email. Please try again",
        statusCode: 401,
      };
    }

    // Compare passwords
    const isPasswordValid = await comparePasswords(
      req.body.oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw {
        name: "AuthenticationError",
        message: "The old password is incorrect",
        statusCode: 401,
      };
    }

    // Update the password
    user.password = await hashPassword(req.body.newPassword);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
