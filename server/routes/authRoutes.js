/**
 * Authentication routes (/api/auth/...).
 * Register uses multipart/form-data because of optional profile photo uploads.
 */

const express = require("express");
const path = require("path");
const multer = require("multer");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// --------- Multer setup: save files under server/uploads with timestamped filenames ---------
const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename(_req, file, cb) {
    const stamp = Date.now();
    const safeOriginal = path.basename(file.originalname).replace(/[^\w.-]+/g, "_");
    cb(null, `${stamp}-${safeOriginal}`);
  },
});

const uploadPhoto = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB safeguard
}).single("photo");

router.post("/register", (req, res) => {
  uploadPhoto(req, res, async (uploadErr) => {
    // Multer throws if file type/size invalid or disk issues occur
    if (uploadErr) {
      console.error("Multer error:", uploadErr);
      return res.status(400).json({
        success: false,
        message: uploadErr.message || "File upload failed",
      });
    }
    return register(req, res);
  });
});

// Login stays JSON ({ email, password }) — simpler for clients & SPA forms
router.post("/login", login);

module.exports = router;
