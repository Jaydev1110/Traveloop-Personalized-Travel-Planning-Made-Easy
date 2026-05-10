/**
 * TripNote model — free-form notes on a trip; optionally scoped to one stop.
 * Deleting a Trip cascades and removes all its notes.
 * stop_id is nullable: if a stop is removed, we clear the link (SET NULL) rather than delete the note with the stop.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const TripNote = sequelize.define(
  "TripNote",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trips",
        key: "id",
      },
    },
    // Null = general trip note; set = note tied to that stop
    stop_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "stops",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "trip_notes",
    timestamps: true,
    underscored: true,
  }
);

module.exports = TripNote;
