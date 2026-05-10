/**
 * Protect Express routes behind JWT Bearer authentication.
 *
 * Typical usage inside a router:
 *   router.get('/profile', authenticateToken, getProfileController);
 */

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";

  if (!authHeader || typeof authHeader !== "string") {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  const parts = authHeader.trim().split(/\s+/);
  const scheme = parts[0];
  const jwtToken = parts[1];

  const isBearerScheme = scheme?.toLowerCase() === "bearer";

  if (!jwtToken || !isBearerScheme || parts.length !== 2) {
    return res.status(401).json({
      success: false,
      message: "Authorization header must be: Bearer <token>",
    });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing from environment variables");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration",
      });
    }

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Mirror the payload minted during login
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    return next();
  } catch (_err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

module.exports = authenticateToken;
