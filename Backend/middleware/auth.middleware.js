const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.header("Authorization")) {
    token = req.header("Authorization").replace(/^Bearer\s+/i, "");
  }

  // Check for token in cookies
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: "Authorization denied, no token" });
  }

  try {
    // Verify the token and decode it
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
    
    next();
  } catch (err) {
    console.error("Token verification error:", err); // Log error for debugging
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
