/**
 * Handles sign-up / sign-in / profile-load logic for Traveloop.
 *
 * Hashing + JWT creation live here so routes stay skinny.
 *
 * If MySQL is unavailable at boot (`appState.dbConnected === false`),
 * we transparently fall back to an in-memory user store so the auth flow
 * still works for local development and demos.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { appState } = require("../lib/runtime");
const {
  memoryCreateUser,
  memoryFindByEmail,
  memoryFindById,
  memoryToPublic,
} = require("../lib/memoryUserStore");

/** How many hashing rounds bcrypt should use. Higher = slower & harder to brute-force. */
const SALT_ROUNDS = 10;

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "7d" }
  );
}

function sanitizeDbUser(instance) {
  const u = instance.get({ plain: true });
  delete u.password_hash;
  return u;
}

/**
 * Build a single display name from the request body.
 * Accepts either a flat `name` field or `firstName` + `lastName` (the client
 * register form sends the latter pair as multipart fields).
 */
function resolveName(body) {
  const flat = (body.name || "").trim();
  if (flat) return flat.slice(0, 100);

  const first = (body.firstName || "").trim();
  const last = (body.lastName || "").trim();
  return `${first} ${last}`.trim().slice(0, 100);
}

/**
 * POST /api/auth/register
 * Multipart fields (handled by Multer in the route layer):
 *   firstName, lastName (or name), email, password, phone?, city?, country?, photo?
 *
 * Saves profile photo path to `photo` if a file was uploaded; otherwise stays null.
 */
async function register(req, res) {
  try {
    const name = resolveName(req.body);
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";
    const phone = (req.body.phone || "").trim() || null;
    const city = (req.body.city || "").trim() || null;
    const country = (req.body.country || "").trim() || null;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name (or firstName + lastName), email, and password are required",
      });
    }

    const photoPath = req.file ? `/uploads/${req.file.filename}` : null;
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    if (appState.dbConnected) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: "An account already exists with this email",
        });
      }

      const user = await User.create({
        name,
        email,
        password_hash,
        photo: photoPath,
        phone,
        city,
        country,
        role: "user",
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: sanitizeDbUser(user),
      });
    }

    const user = await memoryCreateUser({
      name,
      email,
      password,
      photo: photoPath,
      phone,
      city,
      country,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    if (err && err.status === 409) {
      return res.status(409).json({ success: false, message: err.message });
    }
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
}

/**
 * POST /api/auth/login (JSON body: { email, password })
 *
 * Validates credentials and returns JWT + sanitized user snapshot.
 * Response shape stays flat (`{ token, user }`) so the client can read
 * `data.token` and `data.user.role` directly.
 */
async function login(req, res) {
  try {
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from environment variables");
      return res.status(500).json({
        success: false,
        message: "Server misconfiguration",
      });
    }

    let userPayload;

    if (appState.dbConnected) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      userPayload = sanitizeDbUser(user);
    } else {
      const row = await memoryFindByEmail(email);
      if (!row) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      const ok = await bcrypt.compare(password, row.password_hash);
      if (!ok) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      userPayload = memoryToPublic(row);
    }

    const token = signToken(userPayload);

    return res.json({
      success: true,
      token,
      user: userPayload,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
}

/**
 * GET /api/auth/me
 * Returns the currently-authenticated user (from either DB or in-memory store).
 * Requires `authenticateToken` middleware to populate `req.user`.
 */
async function me(req, res) {
  try {
    if (appState.dbConnected) {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      return res.json({ success: true, user: sanitizeDbUser(user) });
    }

    const row = await memoryFindById(req.user.id);
    if (!row) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({ success: true, user: memoryToPublic(row) });
  } catch (err) {
    console.error("Profile load error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
}

module.exports = {
  register,
  login,
  me,
};
