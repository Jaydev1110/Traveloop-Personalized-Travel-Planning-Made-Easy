/**
 * Activity catalogue mounted at /api/activities (read-only catalogue).
 */

const express = require("express");
const { getActivities } = require("../controllers/activityController");

const router = express.Router();

router.get("/", getActivities);

module.exports = router;
