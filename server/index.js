const express = require("express");

const app = express();

app.use(express.json());
app.get("/test", (request, response) => {
  response.send("Hello World, finance bot here");
});

module.exports = app;
