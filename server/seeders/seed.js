/**
 * Traveloop database seeder — cities + catalogue activities only.
 *
 * Run from the `server/` folder so `.env` is picked up correctly:
 *
 *   node seeders/seed.js
 *
 * Optional npm shortcut (see package.json):
 *
 *   npm run seed
 */

const path = require("path");

// Ensure .env resolves even if you run the script from another working directory.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const { sequelize } = require("../config/db");
const { City, Activity } = require("../models");

const citiesData = require("./citiesData");
const activitiesData = require("./activitiesData");

/**
 * Deletes every row from `activities` then `cities`.
 * FK checks pause briefly so TRUNCATE works if other tables referenced activities earlier
 * (development convenience — ⚠️ do not aim at production without backups).
 */
async function clearCityAndActivityData() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  try {
    // Child-ish catalogue table first, then cities
    await Activity.destroy({ truncate: true });
    await City.destroy({ truncate: true });
  } finally {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  }
}

/**
 * Map human-readable city name → auto-increment id Sequelize returned after bulk insert.
 */
function buildCityIdByName(cityInstances) {
  const map = {};
  for (const row of cityInstances) {
    map[row.name] = row.id;
  }
  return map;
}

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log("🔗 Connected to database");

    // Builds missing tables; does NOT drop unrelated user tables (`force` stays off).
    await sequelize.sync();
    console.log("🗄️ Sequelize sync finished (no force)");

    console.log("🧹 Clearing old cities + activities catalogue…");
    await clearCityAndActivityData();

    console.log(`📍 Inserting ${citiesData.length} cities…`);
    await City.bulkCreate(citiesData);
    console.log("✅ Cities seeded");

    // Re-query so IDs are guaranteed (some MySQL drivers omit ids on bulkCreate).
    const createdCities = await City.findAll({ attributes: ["id", "name"] });
    const cityIdByName = buildCityIdByName(createdCities);

    // Turn each `{ city_name, ... }` payload into `{ city_id, ... }`
    const activityRows = activitiesData.map(
      ({ city_name: cityName, ...activityFields }) => {
        const cityId = cityIdByName[cityName];
        if (!cityId) {
          throw new Error(
            `Seed mismatch: unknown city_name "${cityName}". Compare against citiesData names.`
          );
        }
        return {
          ...activityFields,
          city_id: cityId,
        };
      }
    );

    console.log(`🎯 Inserting ${activityRows.length} activities…`);
    await Activity.bulkCreate(activityRows);
    console.log("✅ Activities seeded");

    console.log("🌱 Database seeding complete");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
    console.log("👋 Sequelize connection closed");
  }
}

seedDatabase();
