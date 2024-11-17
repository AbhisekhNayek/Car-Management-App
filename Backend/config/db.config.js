const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connected");
  } catch (err) {
    // Log error and exit if connection fails
    console.error("Connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
