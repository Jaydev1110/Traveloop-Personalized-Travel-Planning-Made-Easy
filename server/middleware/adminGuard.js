/**
 * Gate routes that must only reach admin accounts.
 *
 * IMPORTANT: Always load `authenticateToken` before this middleware so req.user exists.
 */

function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin privileges required",
    });
  }

  return next();
}

module.exports = requireAdmin;
