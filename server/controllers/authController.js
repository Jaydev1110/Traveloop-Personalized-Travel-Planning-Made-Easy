/**
 * Handles sign-up / sign-in logic for Traveloop.
 * Keeps hashing + JWT creation here so routes stay skinny.
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/** How many hashing rounds bcrypt should use (cost factor). Higher = slower & harder to brute-force */
const SALT_ROUNDS = 10;

/**
 * POST /api/auth/register
 * Expects multipart fields from the router (handled by Multer middleware).
 *
 * Saves profile photo path to `photo` if a file was uploaded; otherwise stays null.
 */
async function register(req, res) {
  try {
    const { name, email, password, phone, city, country } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, and password are required",
      });
    }

    const existing = await User.findOne({ where: { email: email.trim() } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account already exists with this email",
      });
    }

    // Multer attaches `req.file` when multipart field named `photo` is present.
    let photoPath = null;
    if (req.file) {
      photoPath = `/uploads/${req.file.filename}`;
    }

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password_hash,
      photo: photoPath,
      phone: phone?.trim?.() || null,
      city: city?.trim?.() || null,
      country: country?.trim?.() || null,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
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
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

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

    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const tokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
}

module.exports = {
  register,
  login,
};
