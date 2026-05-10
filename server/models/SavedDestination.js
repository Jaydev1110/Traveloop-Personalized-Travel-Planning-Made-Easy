/**
 * SavedDestination model — bookmarks a city for a user (wishlist).
 * Deleting the user or city is not configured to cascade here (no requirement);
 * you can add CASCADE later if product rules require it.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const SavedDestination = sequelize.define(
  "SavedDestination",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cities",
        key: "id",
      },
    },
  },
  {
    tableName: "saved_destinations",
    timestamps: true,
    underscored: true,
  }
);

module.exports = SavedDestination;
