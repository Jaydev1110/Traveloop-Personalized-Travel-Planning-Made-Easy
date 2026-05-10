/**
 * User model — stores people who sign up for Traveloop.
 * Each user can create many trips (see Trip model + associations in index.js).
 */
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    // Primary key: auto-incrementing integer
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // User display name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Login identity (must be unique across the app)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Bcrypt hash — never store plain passwords
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Optional profile photo path or URL
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Who can access admin routes (checked in middleware)
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;
