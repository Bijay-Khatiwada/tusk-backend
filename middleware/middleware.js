const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    // ✅ Extract token from request headers
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    // ✅ Verify token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Store user ID in request
    req.userRole = decoded.role;  // Store user role in request

    console.log("Extracted User Role:", req.userRole); // ✅ Debugging log

    // ✅ Check if user is an admin
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Access denied. Only admins can assign roles." });
    }

    next(); // ✅ Proceed if admin
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { isAdmin };


