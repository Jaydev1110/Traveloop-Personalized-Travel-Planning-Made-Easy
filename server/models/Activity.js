/**
 * Activity model — things to do in a city (seeded per city).
 * Links to exactly one City via city_id.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Which city this activity belongs to (FK to cities.id)
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "adventure",
        "food",
        "culture",
        "wellness",
        "sightseeing",
        "shopping"
      ),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Price hint in rupees/dollars etc.
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    // How long the experience usually takes
    duration_hrs: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "activities",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Activity;
