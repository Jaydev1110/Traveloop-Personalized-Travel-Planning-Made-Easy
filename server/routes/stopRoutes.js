/**
 * Stop routes mounted at /api/stops.
 */
const express = require("express");
const authenticateToken = require("../middleware/auth");
const { updateStop, deleteStop } = require("../controllers/stopController");

const router = express.Router();

router.use(authenticateToken);

router.put("/:id", updateStop);
router.delete("/:id", deleteStop);

module.exports = router;
