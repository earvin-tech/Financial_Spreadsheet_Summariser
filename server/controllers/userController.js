const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const generateToken = require("../utils/generateToken");

/**
 * Helper to throw an error with a custom status code
 * @param {string} message - Error message. 
 * @param {number} statusCode - HTTP status code for the error.
 * @throws {Error} Throws an error with the specified status code. 
 */
const throwError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

/**
 * Registers a new user and returns a JWT token.
 * 
 * POST - /api/users/register
 * @async
 * @function registerUser
 * @access public
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @returns {Promise<void>} Sends a JSON response with the new user's details and JWT token.
 */
const registerUser = catchAsync(async (request, response) => {
  const { username, email, password } = request.body;

  const existing = await User.findOne({ email });
  if (existing) {
    throwError("Email already in use", 409);
  }

  const user = new User({ username, email, password });
  await user.save();

  const token = generateToken(user._id);

  response.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

/**
 * Logs in a user using email or username and returns a JWT token.
 * 
 * POST - /api/users/login
 * @async
 * @function loginUser
 * @access public
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @returns {Promise<void>} Sends a JSON response with user details and JWT token.
 */
const loginUser = catchAsync(async (request, response) => {
  const { username, email, password } = request.body;

  const user = await User.findOne(email ? { email } : { username });

  if (!user || !(await user.matchPassword(password))) {
    throwError("Invalid credentials", 401);
  }

  const token = generateToken(user._id);

  response.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

/**
 * Deletes the currently authenticated user.
 *
 * DELETE - /api/users/me
 * @async
 * @function deleteUser
 * @access protected
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @returns {Promise<void>} Sends a success message after user deletion.
 */
const deleteUser = catchAsync(async (request, response) => {
  const { password } = request.body;

  const user = await User.findById(request.user._id);
  if (!user || !(await user.matchPassword(password))) {
    throwError("Invalid credentials", 401);
  }

  await User.deleteOne({ _id: user._id });

  response.status(200).json({
    message: "User deleted successfully",
  });
});

/**
 * Updates the authenticated user's password.
 *
 * PATCH - /api/users/me
 * @async
 * @function updatePassword
 * @access protected
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @returns {Promise<void>} Sends a success message after password update.
 */
const updatePassword = catchAsync(async (request, response) => {
  const { oldPassword, newPassword } = request.body;

  const user = await User.findById(request.user._id);
  if (!user || !(await user.matchPassword(oldPassword))) {
    throwError("Old password is incorrect", 401);
  }

  if (!newPassword) {
    throwError("New password is required", 400);
  }

  user.password = newPassword;
  await user.save();

  response.status(200).json({
    message: "Password updated successfully",
  });
});

/**
 * Retrieves details of the currently authenticated user.
 *
 * GET - /api/users/me
 * @async
 * @function getCurrentUser
 * @access protected
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @returns {Promise<void>} Sends a JSON response with user details.
 */
const getCurrentUser = catchAsync(async (request, response) => {
  const user = await User.findById(request.user._id).select("-password -salt");

  if (!user) {
    throwError("User not found", 404);
  }

  response.status(200).json(user);
});

module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updatePassword,
  getCurrentUser,
};
