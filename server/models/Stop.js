/**
 * Stop model — one segment of a trip (a city visit with date range and order).
 * Deleting a Trip cascades and removes all its stops.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Stop = sequelize.define(
  "Stop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Parent trip (removed if the trip is deleted — see index.js onDelete: CASCADE)
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trips",
        key: "id",
      },
    },
    // Which city this stop is in
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // Controls drag-and-drop order in the itinerary builder
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "stops",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Stop;
