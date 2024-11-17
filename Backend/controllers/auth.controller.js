const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Signup request:", req.body);
  
  try {
    // Validate email format (basic check)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(12);  // Stronger hashing
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET environment variable is not set" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err); // Log error for debugging
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET environment variable is not set" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookie
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err); // Log error for debugging
    res.status(500).json({ error: "Server error" });
  }
};
