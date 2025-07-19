const express = require("express");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.get("/test", (request, response) => {
  response.send("Hello World, finance bot here");
});

app.use("/api/users", userRoutes);

app.use(errorHandler);

module.exports = app;
