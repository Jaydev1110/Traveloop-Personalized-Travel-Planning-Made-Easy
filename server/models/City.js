/**
 * City model — master list of destinations (usually seeded, not user-created).
 * JSON fields hold flexible data like highlights arrays and eatery objects.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const City = sequelize.define(
  "City",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // e.g. North / South / East / West / Northeast
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost_index: {
      type: DataTypes.ENUM("budget", "mid", "premium"),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hero_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // MySQL JSON column — arrays/objects from the API stay structured
    highlights: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    eateries: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tips: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "cities",
    timestamps: true,
    underscored: true,
  }
);

module.exports = City;
