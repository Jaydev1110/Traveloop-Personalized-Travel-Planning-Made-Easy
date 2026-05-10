/**
 * Admin routes mounted at /api/admin.
 * Protected by authenticateToken + requireAdmin.
 */

const express = require("express");
const authenticateToken = require("../middleware/auth");
const requireAdmin = require("../middleware/adminGuard");
const {
  getUsers,
  getPopularActivities,
} = require("../controllers/adminController");

const router = express.Router();

// Every route in this file requires admin privileges.
router.use(authenticateToken);
router.use(requireAdmin);

router.get("/users", getUsers);
router.get("/popular-activities", getPopularActivities);

module.exports = router;
