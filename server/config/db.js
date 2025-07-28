const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using the connection string
 * defined in the environment variables.
 *
 * If the connection is successful, logs a confirmation message.
 * If it fails, logs the error and exits the process with code 1.
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves if the connection is successful, otherwise exits the process.
 * @example
 * // In your server.js
 * const connectDB = require("./config/db");
 * connectDB();
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection error", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
