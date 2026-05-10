/**
 * Sequelize bootstrap. Database name + credentials come from .env.
 * `connectDB()` resolves to a boolean so callers can fall back gracefully
 * (e.g. in-memory auth) when MySQL is not available yet.
 */
const { Sequelize } = require("sequelize");
require("dotenv").config();

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "traveloop",
  DB_LOGGING,
  DB_CONNECT_TIMEOUT_MS,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: DB_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    connectTimeout: Number(DB_CONNECT_TIMEOUT_MS) || 5000,
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully");
    return true;
  } catch (err) {
    console.warn(
      "[db] MySQL not available — falling back to in-memory auth:",
      err.message
    );
    return false;
  }
}

module.exports = { sequelize, connectDB };
