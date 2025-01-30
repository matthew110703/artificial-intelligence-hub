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

    // Update user
    user.set(req.body);
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
