const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "test") {
  dotenv.config();
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * Generates a signed JSON Web Token (JWT) for a given user ID.
 * @function generateToken
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} A signed JWT valid for 7 days.
 * @example
 * const token = generateToken("12345");
 * console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI...
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;
