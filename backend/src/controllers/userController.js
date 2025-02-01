// Model
import User from "../models/userModel.js";

/**
 * Get user
 */
export const getUser = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      throw {
        statusCode: 404,
        name: "NotFound",
        message: "User not found",
      };
    }

    // Send response
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 */
export const updateUser = async (req, res, next) => {
  const {
    username: newUsername,
    email: newEmail,
    firstName,
    lastName,
    purpose,
  } = req.body;
  try {
    // Validate Email
    if (newEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        throw {
          statusCode: 400,
          name: "BadRequest",
          message: "Invalid email address",
        };
      }
    }

    // Check if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      throw {
        statusCode: 404,
        name: "NotFound",
        message: "User not found",
      };
    }

    // Check if username is taken
    if (newUsername) {
      const username = await User.findOne({ newUsername });
      if (username && username._id.toString() !== req.user._id) {
        throw {
          statusCode: 400,
          name: "BadRequest",
          message: "Username is already taken",
        };
      }
    }

    // Check if email is taken
    if (newEmail) {
      const email = await User.findOne({
        newEmail,
      });
      if (email && email._id.toString() !== req.user._id) {
        throw {
          statusCode: 400,
          name: "BadRequest",
          message: "Email is already taken",
        };
      }
    }

    // Update user
    user.set({
      username: newUsername || user.username,
      email: newEmail || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      purpose: purpose || user.purpose,
    });
    await user.save();

    // Send response
    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      throw {
        statusCode: 404,
        name: "NotFound",
        message: "User not found",
      };
    }

    // Delete user
    await user.deleteOne();

    // Send response
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
