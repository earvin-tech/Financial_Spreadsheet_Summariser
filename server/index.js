const express = require("express");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const uploadRoute = require("./routes/uploadRoute");

const app = express();

/**
 * @file index.js
 * @description Initializes the Express application, sets up global middleware,
 * routes, and the global error handler.
 */

// Built-in middleware to parse JSON request bodies
app.use(express.json());

/**
 * Test route for verifying server status.
 * GET /test
 * @returns {string} Returns a simple Hello World message.
 */
app.get("/test", (request, response) => {
  response.send("Hello World, finance bot here");
});

// Mount user-related API routes
app.use("/api/users", userRoutes);

//Mount upload route
app.use("/api/upload", uploadRoute);

// Global error-handling middleware
app.use(errorHandler);

module.exports = app;
