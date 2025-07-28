const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

/**
 * Middleware to verify JWT and attach the authenticated user to the request object.
 *
 * - Expects a Bearer token in the `Authorization` header.
 * - Verifies the token using `JWT_SECRET`.
 * - Fetches the user from the database and attaches it to `request.user`.
 * - Throws a 401 error if the token is missing, invalid, or the user doesn't exist.
 * @async
 * @function verifyToken
 * @access protected
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
const verifyToken = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  // Check if token exists in Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Unauthorized: No token provided");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token and decode user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database and exclude password field
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const error = new Error("Unauthorized: User not found");
      error.statusCode = 401;
      return next(error);
    }

    request.user = user; // Attach user to request
    next();
  } catch (err) {
    err.statusCode = 401;
    next(err);
  }
};

module.exports = verifyToken;
