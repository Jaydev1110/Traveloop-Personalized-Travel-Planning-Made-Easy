import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase } from './config/db.js';
import { setDbConnected, appState } from './lib/runtime.js';
import { seedMemoryAdminIfNeeded } from './lib/memoryUserStore.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, dbConnected: appState.dbConnected });
});

app.use('/api/auth', authRoutes);

app.use((err, _req, res, _next) => {
  if (err.status === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  const status = err.statusCode || err.status || 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ message: err.message || 'Internal server error' });
});

async function start() {
  const connected = await connectDatabase();
  setDbConnected(connected);
  if (!connected) {
    await seedMemoryAdminIfNeeded();
    console.info('[auth] In-memory mode: register users works; default admin:', process.env.ADMIN_EMAIL || 'admin@traveloop.com');
  } else {
    console.info('[db] MySQL connected — auth uses users table.');
  }

  const server = app.listen(PORT, () => {
    console.log(`Traveloop API listening on http://localhost:${PORT}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[server] Port ${PORT} is already in use. Stop the other process or set PORT in .env.`);
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}

start();
