const { body, validationResult } = require("express-validator");

/**
 * Handles validation errors from express-validator.
 *
 * If errors are found, responds with status 400 and a JSON object containing
 * all validation error details. If there are no errors, it calls the next middleware.
 * @function handleValidationErrors
 * @param {import("express").Request} request - Express request object.
 * @param {import("express").Response} response - Express response object.
 * @param {import("express").NextFunction} next - Express next function.
 * @returns {void}
 */
const handleValidationErrors = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

/**
 * Validation chain for user registration.
 *
 * Validates:
 * - `username`: Required, minimum 3 characters.
 * - `email`: Must be a valid email.
 * - `password`: Minimum 8 characters, must include uppercase, lowercase, and special character.
 * @type {Array<import("express-validator").ValidationChain|Function>}
 */
const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("email").trim().isEmail().withMessage("Email must be valid"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character (!@#$%^&*)"),

  handleValidationErrors,
];

/**
 * Validation chain for password updates.
 *
 * Validates:
 * - `oldPassword`: Required.
 * - `newPassword`: Minimum 8 characters, must include uppercase, lowercase, and special character.
 * @type {Array<import("express-validator").ValidationChain|Function>}
 */
const validatePasswordUpdate = [
  body("oldPassword").notEmpty().withMessage("Please enter your old password"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character (!@#$%^&*)"),

  handleValidationErrors,
];

/**
 * Validation chain for user login.
 *
 * Validates:
 * - Either `email` (valid format) or `username` (minimum 3 characters) is provided.
 * - `password`: Required.
 * @type {Array<import("express-validator").ValidationChain|Function>}
 */
const validateLogin = [
  body("email")
    .optional()
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("If logging in by email, email must be valid"),

  body("username")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage(
      "If logging in by username, username must be at least 3 characters"
    ),

  body("password").notEmpty().withMessage("Password is required"),

  body().custom((body) => {
    if (!body.email && !body.username) {
      throw new Error("Either email or username is required");
    }
    return true;
  }),

  handleValidationErrors,
];

/**
 * Validation chain for account deletion.
 *
 * Validates:
 * - `password`: Required.
 * @type {Array<import("express-validator").ValidationChain|Function>}
 */
const validateDeleteUser = [
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validatePasswordUpdate,
  validateLogin,
  validateDeleteUser,
};
