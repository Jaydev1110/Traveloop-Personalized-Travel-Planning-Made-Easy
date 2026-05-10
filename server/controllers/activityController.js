/**
 * Activity catalogue endpoints (read-only catalogue data).
 */

const { Op } = require("sequelize");
const { Activity, City } = require("../models");

const ACTIVITY_TYPES = new Set([
  "adventure",
  "food",
  "culture",
  "wellness",
  "sightseeing",
  "shopping",
]);

function sanitizeLike(term) {
  if (!term || typeof term !== "string") return "";
  return term.replace(/[%_\\]/g, (ch) => `\\${ch}`);
}

/** Turn Sequelize rows into frontend-friendly `{ ...activity, city_name }` payloads. */
function formatActivityRow(activityRow) {
  const plain = activityRow.get({ plain: true });
  const nestedCity = plain.City || null;

  delete plain.City;

  return {
    ...plain,
    city_name: nestedCity?.name ?? null,
  };
}

/**
 * GET /api/activities
 * Filters: ?type=  ?city=  ?maxCost=
 */
async function getActivities(req, res) {
  try {
    const where = {};

    /** Always join cities so each row exposes `City` for serialization to `city_name`. */
    const cityInclude = {
      model: City,
      attributes: ["id", "name"],
      required: true,
    };

    const { type, city, maxCost } = req.query;

    if (type !== undefined && String(type).trim() !== "") {
      const t = String(type).trim().toLowerCase();
      if (ACTIVITY_TYPES.has(t)) {
        where.type = t;
      }
    }

    if (maxCost !== undefined && String(maxCost).trim() !== "") {
      const cap = Number.parseFloat(String(maxCost).trim());
      if (!Number.isNaN(cap) && cap >= 0) {
        where.cost = {
          [Op.lte]: cap,
        };
      }
    }

    // Filter by traveller-friendly city NAME (joined table) rather than guessing numeric ids from the UI.
    if (city !== undefined && String(city).trim() !== "") {
      const needle = sanitizeLike(String(city).trim());
      cityInclude.where = {
        name: {
          [Op.like]: `%${needle}%`,
        },
      };
    }

    const rows = await Activity.findAll({
      where,
      include: [cityInclude],
      order: [["name", "ASC"]],
    });

    const data = rows.map(formatActivityRow);

    return res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    console.error("getActivities error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
}

module.exports = {
  getActivities,
};
