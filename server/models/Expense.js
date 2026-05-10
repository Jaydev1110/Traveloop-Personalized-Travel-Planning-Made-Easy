/**
 * Expense model — budget line items attached to a trip.
 * Deleting a Trip cascades and removes all its expenses.
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Expense = sequelize.define(
  "Expense",
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
    category: {
      type: DataTypes.ENUM(
        "Hotel",
        "Flight",
        "Train",
        "Food",
        "Activity",
        "Other"
      ),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Expense;
