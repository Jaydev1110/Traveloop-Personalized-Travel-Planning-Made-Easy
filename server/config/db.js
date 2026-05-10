import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST = 'localhost',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'traveloop',
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  dialectOptions: {
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT_MS) || 5000,
  },
});

/**
 * Call when MySQL is ready. Returns true if connected, false otherwise.
 * Does not run sync/migrations — your DB teammate owns schema lifecycle.
 */
export async function connectDatabase() {
  try {
    await sequelize.authenticate();
    return true;
  } catch (err) {
    console.warn('[db] MySQL not available yet — using in-memory auth fallback:', err.message);
    return false;
  }
}
