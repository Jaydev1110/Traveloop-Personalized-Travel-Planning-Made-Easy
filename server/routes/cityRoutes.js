/**
 * Catalogue routes mounted at /api/cities (see server/index.js).
 *
 * IMPORTANT: define `/:id/activities` before `/:id` so `/activities`
 * cannot be swallowed as `:id`.
 */

const express = require("express");
const {
  getCities,
  getCityById,
  getCityActivities,
} = require("../controllers/cityController");

const router = express.Router();

router.get("/", getCities);
router.get("/:id/activities", getCityActivities);
router.get("/:id", getCityById);

module.exports = router;
