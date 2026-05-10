/**
 * City catalogue endpoints (read-only for travellers).
 * Filter examples: ?search=goa  &region=North  &cost=budget
 */

const { Op } = require("sequelize");
const { City, Activity } = require("../models");

/** Fields returned in the list/grid view (lighter payload). */
const CITY_LIST_ATTRIBUTES = [
  "id",
  "name",
  "state",
  "region",
  "cost_index",
  "hero_image",
  "highlights",
];

/** Valid ?cost= values (stored as cost_index in the database). */
const COST_INDEX_VALUES = new Set(["budget", "mid", "premium"]);

/** Valid activity ?type= ENUM values — keeps bad query params from exploding SQL. */
const ACTIVITY_TYPES = new Set([
  "adventure",
  "food",
  "culture",
  "wellness",
  "sightseeing",
  "shopping",
]);

/**
 * Escape characters that have special meaning inside SQL LIKE clauses.
 * This helps avoid accidental wildcard injection from user typing % or _.
 */
function sanitizeLike(term) {
  if (!term || typeof term !== "string") return "";
  return term.replace(/[%_\\]/g, (ch) => `\\${ch}`);
}

function parsePositiveInt(value) {
  const n = Number.parseInt(value, 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

/**
 * GET /api/cities
 * Supports: ?search=  ?region=  ?cost=
 */
async function getCities(req, res) {
  try {
    const where = {};

    const { search, region, cost } = req.query;

    if (search !== undefined && String(search).trim() !== "") {
      const needle = sanitizeLike(String(search).trim());
      where.name = {
        [Op.like]: `%${needle}%`,
      };
    }

    if (region !== undefined && String(region).trim() !== "") {
      where.region = {
        [Op.like]: `%${sanitizeLike(String(region).trim())}%`,
      };
    }

    if (cost !== undefined && String(cost).trim() !== "") {
      const key = String(cost).trim().toLowerCase();
      if (COST_INDEX_VALUES.has(key)) {
        where.cost_index = key;
      }
      // silently ignore unexpected cost values instead of leaking SQL confusion
    }

    const cities = await City.findAll({
      where,
      attributes: CITY_LIST_ATTRIBUTES,
      order: [["name", "ASC"]],
    });

    return res.json({
      success: true,
      count: cities.length,
      data: cities,
    });
  } catch (err) {
    console.error("getCities error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
    });
  }
}

/**
 * GET /api/cities/:id
 * Includes description, eateries, tips, etc.
 */
async function getCityById(req, res) {
  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid city id",
      });
    }

    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    return res.json({
      success: true,
      data: city,
    });
  } catch (err) {
    console.error("getCityById error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch city details",
    });
  }
}

/**
 * GET /api/cities/:id/activities
 * Optional filter: ?type=adventure
 */
async function getCityActivities(req, res) {
  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid city id",
      });
    }

    const city = await City.findByPk(id, { attributes: ["id"] });
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    const activityWhere = { city_id: id };

    const { type } = req.query;
    if (type !== undefined && String(type).trim() !== "") {
      const t = String(type).trim().toLowerCase();
      if (ACTIVITY_TYPES.has(t)) {
        activityWhere.type = t;
      }
    }

    const activities = await Activity.findAll({
      where: activityWhere,
      order: [["name", "ASC"]],
    });

    return res.json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (err) {
    console.error("getCityActivities error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activities for this city",
    });
  }
}

module.exports = {
  getCities,
  getCityById,
  getCityActivities,
};
