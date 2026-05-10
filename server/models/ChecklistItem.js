/**
 * ChecklistItem model — per-user packing rows (not tied to a single trip in the schema).
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ChecklistItem = sequelize.define(
  "ChecklistItem",
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Clothing", "Documents", "Electronics", "Other"),
      allowNull: true,
    },
    is_packed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "checklist_items",
    timestamps: true,
    underscored: true,
  }
);

module.exports = ChecklistItem;
