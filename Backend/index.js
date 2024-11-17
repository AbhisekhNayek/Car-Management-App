const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan"); // HTTP request logging

const authRoutes = require("./routes/auth.routes");
const carRoutes = require("./routes/car.routes");

const app = express();

// Middleware for HTTP request logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Car Management API");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process if connection fails
  });

// Graceful shutdown (handle process termination)
process.on("SIGINT", async () => {
  console.log("Closing server and database connection...");
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = app;
