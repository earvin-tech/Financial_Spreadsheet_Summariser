const dotenv = require("dotenv");
const app = require("./index");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "test") {
  dotenv.config();
}

const PORT = process.env.PORT || 3000;

/**
 * Initializes the server by:
 * 1. Connecting to the MongoDB database.
 * 2. Starting the Express application on the specified port.
 * @file server.js
 * @description Main entry point of the application.
 */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
