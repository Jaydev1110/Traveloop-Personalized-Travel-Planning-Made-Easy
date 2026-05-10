import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { appState } from '../lib/runtime.js';
import {
  memoryCreateUser,
  memoryFindByEmail,
  memoryFindById,
  memoryToPublic,
} from '../lib/memoryUserStore.js';

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
}

function sanitizeDbUser(instance) {
  const u = instance.get({ plain: true });
  delete u.password_hash;
  return u;
}

export async function register(req, res) {
  try {
    const firstName = (req.body.firstName || '').trim();
    const lastName = (req.body.lastName || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';
    const phone = (req.body.phone || '').trim() || null;
    const city = (req.body.city || '').trim() || null;
    const country = (req.body.country || '').trim() || null;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'firstName, lastName, email, and password are required' });
    }

    const name = `${firstName} ${lastName}`.slice(0, 100);
    const photo = req.file ? `/uploads/${req.file.filename}` : null;
    const password_hash = await bcrypt.hash(password, 10);

    if (appState.dbConnected) {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const user = await User.create({
        name,
        email,
        password_hash,
        photo,
        phone,
        city,
        country,
        role: 'user',
      });
      return res.status(201).json({ user: sanitizeDbUser(user) });
    }

    const user = await memoryCreateUser({
      name,
      email,
      password,
      photo,
      phone,
      city,
      country,
    });
    return res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    if (err.status === 409) {
      return res.status(409).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password || '';
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    let userRow;
    if (appState.dbConnected) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      userRow = sanitizeDbUser(user);
    } else {
      const row = await memoryFindByEmail(email);
      if (!row) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const ok = await bcrypt.compare(password, row.password_hash);
      if (!ok) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      userRow = memoryToPublic(row);
    }

    const token = signToken(userRow);
    return res.json({ token, user: userRow });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
}

export async function me(req, res) {
  try {
    if (appState.dbConnected) {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ user: sanitizeDbUser(user) });
    }
    const row = await memoryFindById(req.user.id);
    if (!row) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user: memoryToPublic(row) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to load profile' });
  }
}
