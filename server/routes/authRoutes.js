/**
 * Authentication routes (/api/auth/...).
 */

const express = require("express");
const path = require("path");
const multer = require("multer");
const { register, login, me } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

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
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("photo");

router.post("/register", (req, res) => {
  uploadPhoto(req, res, (uploadErr) => {
    if (uploadErr) {
      console.error("Multer error:", uploadErr);
      return res.status(400).json({
        message: uploadErr.message || "File upload failed",
      });
    }
    return register(req, res);
  });
});

router.post("/login", login);
router.get("/me", authenticateToken, me);

module.exports = router;
