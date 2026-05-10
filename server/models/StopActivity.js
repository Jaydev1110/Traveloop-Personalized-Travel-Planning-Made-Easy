/**
 * StopActivity model — links a scheduled activity instance to a stop.
 * Deleting a Stop cascades and removes all StopActivity rows for that stop.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const StopActivity = sequelize.define(
  "StopActivity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "stops",
        key: "id",
      },
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "activities",
        key: "id",
      },
    },
    // Plain time of day in MySQL TIME format (e.g. 14:30:00)
    scheduled_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "stop_activities",
    timestamps: true,
    underscored: true,
  }
);

module.exports = StopActivity;
