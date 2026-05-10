/**
 * Trip model — a user’s travel plan: dates, budget, visibility, and status.
 * Belongs to one User via user_id.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Trip = sequelize.define(
  "Trip",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Owner of this trip (FK to users.id)
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    cover_photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    // Whether the itinerary appears in community / public links
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM("upcoming", "ongoing", "completed"),
      allowNull: false,
      defaultValue: "upcoming",
    },
  },
  {
    tableName: "trips",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Trip;
