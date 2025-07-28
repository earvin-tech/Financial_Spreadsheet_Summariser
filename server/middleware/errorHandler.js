/**
 * Global error-handling middleware for Express.
 *
 * This middleware:
 * - Logs the error (except when in `test` mode).
 * - Sends a structured JSON response with:
 *   - `success: false`
 *   - The error message
 *   - The stack trace (only when `NODE_ENV` is `development`).
 * @function errorHandler
 * @access public
 * @param {Error} err - The error object.
 * @param {import("express").Request} request - The Express request object.
 * @param {import("express").Response} response - The Express response object.
 * @param {import("express").NextFunction} next - Express next function (unused).
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, request, response, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error("❌ Error caught by errorHandler:", err);
  }

  const statusCode = err.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
