const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/Auth";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
