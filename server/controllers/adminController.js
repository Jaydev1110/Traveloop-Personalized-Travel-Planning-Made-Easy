/**
 * Admin-only controller endpoints.
 * Every route using these handlers should be behind authenticateToken + requireAdmin.
 */

const { fn, col, literal } = require("sequelize");
const { User, Trip, Activity, StopActivity, City } = require("../models");

/**
 * GET /api/admin/users
 * Returns every user with their trip count.
 */
async function getUsers(_req, res) {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "role",
        "createdAt",
        [fn("COUNT", col("Trips.id")), "tripCount"],
      ],
      include: [
        {
          model: Trip,
          attributes: [],
        },
      ],
      group: ["User.id"],
      order: [["createdAt", "DESC"]],
      subQuery: false,
    });

    return res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("admin getUsers error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
}

/**
 * GET /api/admin/popular-activities
 * Returns every activity with its city name and usage count (how many stops include it).
 */
async function getPopularActivities(_req, res) {
  try {
    const activities = await Activity.findAll({
      attributes: [
        "id",
        "name",
        "type",
        [fn("COUNT", col("StopActivities.id")), "usageCount"],
      ],
      include: [
        {
          model: City,
          attributes: ["name"],
        },
        {
          model: StopActivity,
          attributes: [],
        },
      ],
      group: ["Activity.id", "City.id"],
      order: [[literal("usageCount"), "DESC"]],
      subQuery: false,
    });

    const data = activities.map((row) => {
      const plain = row.get({ plain: true });
      return {
        id: plain.id,
        name: plain.name,
        type: plain.type,
        cityName: plain.City?.name ?? null,
        usageCount: Number(plain.usageCount) || 0,
      };
    });

    return res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("admin getPopularActivities error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular activities",
    });
  }
}

module.exports = {
  getUsers,
  getPopularActivities,
};
