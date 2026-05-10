/**
 * Stop-activity routes mounted at /api/stops.
 */
const express = require("express");
const authenticateToken = require("../middleware/auth");
const {
  addActivityToStop,
  getStopActivities,
  removeActivityFromStop,
} = require("../controllers/stopActivityController");

const router = express.Router();

router.use(authenticateToken);

router.post("/:id/activities", addActivityToStop);
router.get("/:id/activities", getStopActivities);
router.delete("/:stopId/activities/:actId", removeActivityFromStop);

module.exports = router;
