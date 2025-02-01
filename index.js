const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");

// Load environment variables from .env file
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected BOSS!!!"))
  .catch((err) => {
    console.log(err);
  });

// Basic route
// app.get("/", (req, res) => {
//   res.send("Hello IDHAM GANTENG!!!");
// });

app.use(express.json());
app.use("/api/", authRoute);

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
