const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from .env file
dotenv.config();

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully BOSS!");
  })
  .catch((err) => {
    console.error("WADUHH Database connection error:", err);
  });

// Basic route
app.get("/", (req, res) => {
  res.send("Hello IDHAM GANTENG!!!");
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});