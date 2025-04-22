const jwt = require("jsonwebtoken");

/**
 * Middleware to check if the user is authenticated.
 * Adds userId and userRole to the request object.
 */
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};
// isAdmin Middleware
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  next();
};


/**
 * Middleware to restrict access to users with specified roles.
 * Usage: hasRole(["Admin", "Project Manager"])
 */
const hasRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(403).json({ error: "User role not found. Unauthorized access." });
    }

    if (!allowedRoles.includes(req.userRole)) {
      return res.status(403).json({
        error: `Access denied. Allowed roles: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};
// isProjectManager middleware


// isProjectManager middleware
const isProjectManager = (req, res, next) => {
  if (req.userRole !== 'ProjectManager' && req.userRole !== 'Admin') {
    return res.status(403).json({ error: "Access denied. Only ProjectManagers and Admins can access this route." });
  }
  next();
};

// isTeamLead middleware
const isTeamLead = (req, res, next) => {
  if (req.userRole !== 'TeamLead' && req.userRole !== 'Admin') {
    return res.status(403).json({ error: "Access denied. Only TeamLeads and Admins can access this route." });
  }
  next();
};

// isQA middleware
const isQA = (req, res, next) => {
  if (req.userRole !== 'QA' && req.userRole !== 'Admin') {
    return res.status(403).json({ error: "Access denied. Only QA users and Admins can access this route." });
  }
  next();
};

// isObserver middleware
const isObserver = (req, res, next) => {
  if (req.userRole !== 'Observer' && req.userRole !== 'Admin') {
    return res.status(403).json({ error: "Access denied. Only Observers and Admins can access this route." });
  }
  next();
};

module.exports = {
  isAdmin,
  isAuthenticated,
  isProjectManager,
  isTeamLead,
  isQA,
  isObserver
};

