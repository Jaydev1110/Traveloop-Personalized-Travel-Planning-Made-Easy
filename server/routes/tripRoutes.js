/**
 * Trip routes mounted at /api/trips.
 * Includes nested stop endpoints under a specific trip.
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const authenticateToken = require("../middleware/auth");
const {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} = require("../controllers/tripController");
const {
  addStop,
  getStopsByTrip,
  reorderStops,
} = require("../controllers/stopController");

const router = express.Router();

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, uploadsDir);
  },
  filename(_req, file, cb) {
    const stamp = Date.now();
    const safeName = path.basename(file.originalname).replace(/[^\w.-]+/g, "_");
    cb(null, `${stamp}-${safeName}`);
  },
});

const uploadCover = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Protect every trip route.
router.use(authenticateToken);

router.post("/", uploadCover.single("cover_photo"), createTrip);
router.get("/", getMyTrips);
router.get("/:id", getTripById);
router.put("/:id", uploadCover.single("cover_photo"), updateTrip);
router.delete("/:id", deleteTrip);

router.post("/:id/stops", addStop);
router.get("/:id/stops", getStopsByTrip);
router.put("/:id/stops/reorder", reorderStops);

module.exports = router;
