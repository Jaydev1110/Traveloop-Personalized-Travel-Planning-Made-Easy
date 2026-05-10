const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");
require("./models");

const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/** Let uploaded profile photos resolve at http://HOST/uploads/… */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send("Traveloop Backend Running 🚀");
});

async function startServer() {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });

    console.log("✅ All tables synced successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}

startServer();
