/**
 * StopActivity controller
 * Manage activities planned inside a stop.
 */
const { Stop, Trip, StopActivity, Activity } = require("../models");

function parseId(value) {
  const id = Number.parseInt(value, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

async function getOwnedStop(stopId, userId) {
  const stop = await Stop.findOne({
    where: { id: stopId },
    include: [{ model: Trip, attributes: ["id", "user_id"], required: true }],
  });

  if (!stop || stop.Trip.user_id !== userId) {
    return null;
  }

  return stop;
}

/**
 * POST /api/stops/:id/activities
 * Add one activity to a stop.
 */
async function addActivityToStop(req, res) {
  try {
    const stopId = parseId(req.params.id);
    if (!stopId) {
      return res.status(400).json({
        success: false,
        message: "Invalid stop id",
      });
    }

    const stop = await getOwnedStop(stopId, req.user.id);
    if (!stop) {
      return res.status(404).json({
        success: false,
        message: "Stop not found",
      });
    }

    const activityId = parseId(req.body.activity_id);
    if (!activityId) {
      return res.status(400).json({
        success: false,
        message: "Valid activity_id is required",
      });
    }

    const activity = await Activity.findByPk(activityId, { attributes: ["id", "city_id"] });
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    // Optional safety: do not allow an activity from another city in this stop.
    if (activity.city_id !== stop.city_id) {
      return res.status(400).json({
        success: false,
        message: "This activity does not belong to the stop's city",
      });
    }

    // Prevent duplicates: one activity can appear once per stop.
    const duplicate = await StopActivity.findOne({
      where: {
        stop_id: stopId,
        activity_id: activityId,
      },
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This activity is already added to the stop",
      });
    }

    const stopActivity = await StopActivity.create({
      stop_id: stopId,
      activity_id: activityId,
      scheduled_time: req.body.scheduled_time || null,
      notes: req.body.notes || null,
    });

    return res.status(201).json({
      success: true,
      stopActivity,
    });
  } catch (err) {
    console.error("addActivityToStop error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to add activity to stop",
    });
  }
}

/**
 * GET /api/stops/:id/activities
 * Return stop activities with full Activity details.
 */
async function getStopActivities(req, res) {
  try {
    const stopId = parseId(req.params.id);
    if (!stopId) {
      return res.status(400).json({
        success: false,
        message: "Invalid stop id",
      });
    }

    const stop = await getOwnedStop(stopId, req.user.id);
    if (!stop) {
      return res.status(404).json({
        success: false,
        message: "Stop not found",
      });
    }

    const activities = await StopActivity.findAll({
      where: { stop_id: stopId },
      include: [{ model: Activity }],
      order: [["scheduled_time", "ASC"]],
    });

    return res.json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (err) {
    console.error("getStopActivities error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stop activities",
    });
  }
}

/**
 * DELETE /api/stops/:stopId/activities/:actId
 * Remove one activity mapping from a stop.
 */
async function removeActivityFromStop(req, res) {
  try {
    const stopId = parseId(req.params.stopId);
    const actId = parseId(req.params.actId);

    if (!stopId || !actId) {
      return res.status(400).json({
        success: false,
        message: "Invalid stop id or activity id",
      });
    }

    const stop = await getOwnedStop(stopId, req.user.id);
    if (!stop) {
      return res.status(404).json({
        success: false,
        message: "Stop not found",
      });
    }

    const stopActivity = await StopActivity.findOne({
      where: {
        stop_id: stopId,
        activity_id: actId,
      },
    });

    if (!stopActivity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found in this stop",
      });
    }

    await stopActivity.destroy();

    return res.json({
      success: true,
      message: "Activity removed from stop",
    });
  } catch (err) {
    console.error("removeActivityFromStop error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to remove activity from stop",
    });
  }
}

module.exports = {
  addActivityToStop,
  getStopActivities,
  removeActivityFromStop,
};
