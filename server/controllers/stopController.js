/**
 * Stop controller
 * Handles stop CRUD + stop reorder for owner-owned trips.
 */
const { sequelize } = require("../config/db");
const { Trip, Stop, City, StopActivity } = require("../models");

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function getOwnedTrip(tripId, userId) {
  return Trip.findOne({
    where: {
      id: tripId,
      user_id: userId,
    },
  });
}

/**
 * POST /api/trips/:id/stops
 * Add a stop at the end of current itinerary order.
 */
async function addStop(req, res) {
  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await getOwnedTrip(tripId, req.user.id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const { city_id, start_date, end_date } = req.body;
    const cityId = parseId(city_id);
    if (!cityId) {
      return res.status(400).json({
        success: false,
        message: "Valid city_id is required",
      });
    }

    const city = await City.findByPk(cityId, { attributes: ["id"] });
    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    // Assign next index so newly added stop appears at itinerary end.
    const maxOrder = (await Stop.max("order_index", { where: { trip_id: tripId } })) || 0;

    const stop = await Stop.create({
      trip_id: tripId,
      city_id: cityId,
      start_date: start_date || null,
      end_date: end_date || null,
      order_index: maxOrder + 1,
    });

    return res.status(201).json({
      success: true,
      stop,
    });
  } catch (err) {
    console.error("addStop error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add stop",
    });
  }
}

/**
 * GET /api/trips/:id/stops
 * List all stops for a trip with city + activity count.
 */
async function getStopsByTrip(req, res) {
  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await getOwnedTrip(tripId, req.user.id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const stops = await Stop.findAll({
      where: { trip_id: tripId },
      include: [{ model: City }],
      order: [["order_index", "ASC"]],
    });

    const stopIds = stops.map((stop) => stop.id);
    let countMap = {};

    if (stopIds.length > 0) {
      const rows = await StopActivity.findAll({
        where: { stop_id: stopIds },
        attributes: [
          "stop_id",
          [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        ],
        group: ["stop_id"],
      });

      countMap = rows.reduce((acc, row) => {
        const plain = row.get({ plain: true });
        acc[plain.stop_id] = Number(plain.count) || 0;
        return acc;
      }, {});
    }

    const data = stops.map((stop) => {
      const plain = stop.get({ plain: true });
      return {
        ...plain,
        activity_count: countMap[stop.id] || 0,
      };
    });

    return res.json({
      success: true,
      count: data.length,
      stops: data,
    });
  } catch (err) {
    console.error("getStopsByTrip error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stops",
    });
  }
}

/**
 * PUT /api/stops/:id
 * Update stop date range (owner only).
 */
async function updateStop(req, res) {
  try {
    const stopId = parseId(req.params.id);
    if (!stopId) {
      return res.status(400).json({
        success: false,
        message: "Invalid stop id",
      });
    }

    const stop = await Stop.findOne({
      where: { id: stopId },
      include: [{ model: Trip, attributes: ["id", "user_id"], required: true }],
    });

    if (!stop || stop.Trip.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Stop not found",
      });
    }

    const updateData = {};
    if (req.body.start_date !== undefined) updateData.start_date = req.body.start_date || null;
    if (req.body.end_date !== undefined) updateData.end_date = req.body.end_date || null;

    await stop.update(updateData);

    return res.json({
      success: true,
      message: "Stop updated successfully",
      stop,
    });
  } catch (err) {
    console.error("updateStop error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update stop",
    });
  }
}

/**
 * DELETE /api/stops/:id
 * Remove stop (stop activities cascade by model association).
 */
async function deleteStop(req, res) {
  try {
    const stopId = parseId(req.params.id);
    if (!stopId) {
      return res.status(400).json({
        success: false,
        message: "Invalid stop id",
      });
    }

    const stop = await Stop.findOne({
      where: { id: stopId },
      include: [{ model: Trip, attributes: ["id", "user_id"], required: true }],
    });

    if (!stop || stop.Trip.user_id !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Stop not found",
      });
    }

    await stop.destroy();

    return res.json({
      success: true,
      message: "Stop deleted successfully",
    });
  } catch (err) {
    console.error("deleteStop error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete stop",
    });
  }
}

/**
 * PUT /api/trips/:id/stops/reorder
 * Reorder all stops in one DB transaction.
 */
async function reorderStops(req, res) {
  const transaction = await sequelize.transaction();

  try {
    const tripId = parseId(req.params.id);
    if (!tripId) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid trip id",
      });
    }

    const trip = await getOwnedTrip(tripId, req.user.id);
    if (!trip) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const orderedIds = req.body.orderedIds;
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "orderedIds must be a non-empty array",
      });
    }

    const normalizedIds = orderedIds.map(parseId);
    if (normalizedIds.some((id) => !id)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "orderedIds must contain valid stop ids",
      });
    }

    const uniqueIds = new Set(normalizedIds);
    if (uniqueIds.size !== normalizedIds.length) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "orderedIds contains duplicates",
      });
    }

    const existingStops = await Stop.findAll({
      where: { trip_id: tripId },
      attributes: ["id"],
      transaction,
    });

    const existingIds = existingStops.map((stop) => stop.id);
    if (existingIds.length !== normalizedIds.length) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "orderedIds must include all trip stop ids exactly once",
      });
    }

    const existingSet = new Set(existingIds);
    const allBelongToTrip = normalizedIds.every((id) => existingSet.has(id));
    if (!allBelongToTrip) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "orderedIds contains stop(s) not in this trip",
      });
    }

    for (let index = 0; index < normalizedIds.length; index += 1) {
      await Stop.update(
        { order_index: index + 1 },
        {
          where: { id: normalizedIds[index], trip_id: tripId },
          transaction,
        }
      );
    }

    await transaction.commit();

    return res.json({
      success: true,
      message: "Stops reordered successfully",
    });
  } catch (err) {
    await transaction.rollback();
    console.error("reorderStops error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to reorder stops",
    });
  }
}

module.exports = {
  addStop,
  getStopsByTrip,
  updateStop,
  deleteStop,
  reorderStops,
};
