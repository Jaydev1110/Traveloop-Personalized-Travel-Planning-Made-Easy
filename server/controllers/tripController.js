/**
 * Trip controller
 * Handles create/read/update/delete for user-owned trips.
 */
const { Op, fn, col } = require("sequelize");
const { Trip, Stop, City, StopActivity, Activity } = require("../models");

const VALID_STATUSES = new Set(["upcoming", "ongoing", "completed"]);

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseBoolean(value) {
  if (value === true || value === false) return value;
  if (typeof value !== "string") return undefined;
  const lowered = value.trim().toLowerCase();
  if (lowered === "true") return true;
  if (lowered === "false") return false;
  return undefined;
}

/**
 * POST /api/trips
 * Create a new trip for the logged-in user.
 */
async function createTrip(req, res) {
  try {
    const { name, description, start_date, end_date, budget, is_public } = req.body;

    if (!name || String(name).trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Trip name is required",
      });
    }

    const boolPublic = parseBoolean(is_public);
    const coverPath = req.file ? `/uploads/${req.file.filename}` : null;

    const trip = await Trip.create({
      user_id: req.user.id,
      name: String(name).trim(),
      description: description ?? null,
      start_date: start_date || null,
      end_date: end_date || null,
      budget: budget || null,
      is_public: boolPublic !== undefined ? boolPublic : false,
      cover_photo: coverPath,
      status: "upcoming",
    });

    return res.status(201).json({
      success: true,
      trip,
    });
  } catch (err) {
    console.error("createTrip error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create trip",
    });
  }
}

/**
 * GET /api/trips
 * Return only trips owned by current user.
 */
async function getMyTrips(req, res) {
  try {
    const where = { user_id: req.user.id };
    const queryStatus = String(req.query.status || "").trim().toLowerCase();

    if (queryStatus && VALID_STATUSES.has(queryStatus)) {
      where.status = queryStatus;
    }

    const trips = await Trip.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    const tripIds = trips.map((trip) => trip.id);
    let stopCountMap = {};

    if (tripIds.length > 0) {
      const groupedStops = await Stop.findAll({
        where: { trip_id: { [Op.in]: tripIds } },
        attributes: ["trip_id", [fn("COUNT", col("id")), "count"]],
        group: ["trip_id"],
      });

      stopCountMap = groupedStops.reduce((acc, row) => {
        const plain = row.get({ plain: true });
        acc[plain.trip_id] = Number(plain.count) || 0;
        return acc;
      }, {});
    }

    const data = trips.map((trip) => {
      const plain = trip.get({ plain: true });
      return {
        ...plain,
        stop_count: stopCountMap[trip.id] || 0,
      };
    });

    return res.json({
      success: true,
      count: data.length,
      trips: data,
    });
  } catch (err) {
    console.error("getMyTrips error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trips",
    });
  }
}

/**
 * GET /api/trips/:id
 * Return a full nested itinerary for only the trip owner.
 */
async function getTripById(req, res) {
  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await Trip.findOne({
      where: {
        id: tripId,
        user_id: req.user.id,
      },
      include: [
        {
          model: Stop,
          include: [
            { model: City },
            {
              model: StopActivity,
              include: [{ model: Activity }],
            },
          ],
        },
      ],
      order: [
        [Stop, "order_index", "ASC"],
        [Stop, StopActivity, "scheduled_time", "ASC"],
      ],
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    return res.json({
      success: true,
      trip,
    });
  } catch (err) {
    console.error("getTripById error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch trip itinerary",
    });
  }
}

/**
 * PUT /api/trips/:id
 * Update editable trip fields for owner only.
 */
async function updateTrip(req, res) {
  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await Trip.findOne({
      where: { id: tripId, user_id: req.user.id },
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const updateData = {};
    const fields = [
      "name",
      "description",
      "start_date",
      "end_date",
      "budget",
      "cover_photo",
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    if (req.body.status !== undefined) {
      const statusValue = String(req.body.status).trim().toLowerCase();
      if (!VALID_STATUSES.has(statusValue)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
      }
      updateData.status = statusValue;
    }

    if (req.body.is_public !== undefined) {
      const parsed = parseBoolean(req.body.is_public);
      if (parsed === undefined) {
        return res.status(400).json({
          success: false,
          message: "is_public must be true or false",
        });
      }
      updateData.is_public = parsed;
    }

    // If a new file is uploaded, it overrides string value from body.
    if (req.file) {
      updateData.cover_photo = `/uploads/${req.file.filename}`;
    }

    await trip.update(updateData);

    return res.json({
      success: true,
      message: "Trip updated successfully",
      trip,
    });
  } catch (err) {
    console.error("updateTrip error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update trip",
    });
  }
}

/**
 * DELETE /api/trips/:id
 * Delete owner trip. Cascades to related models by association rules.
 */
async function deleteTrip(req, res) {
  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await Trip.findOne({
      where: { id: tripId, user_id: req.user.id },
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    await trip.destroy();

    return res.json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (err) {
    console.error("deleteTrip error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete trip",
    });
  }
}

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
