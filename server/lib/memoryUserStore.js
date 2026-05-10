import bcrypt from 'bcrypt';

let nextId = 1;
const byEmail = new Map();

function toPublicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    photo: row.photo,
    phone: row.phone,
    city: row.city,
    country: row.country,
    role: row.role,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function seedMemoryAdminIfNeeded() {
  const email = process.env.ADMIN_EMAIL || 'admin@traveloop.com';
  const plain = process.env.ADMIN_PASSWORD || 'Admin@123';
  if (byEmail.has(email.toLowerCase())) return;
  const password_hash = await bcrypt.hash(plain, 10);
  const row = {
    id: nextId++,
    name: 'Admin',
    email: email.toLowerCase(),
    password_hash,
    photo: null,
    phone: null,
    city: null,
    country: null,
    role: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  byEmail.set(row.email, row);
}

export async function memoryCreateUser(payload) {
  const email = payload.email.toLowerCase();
  if (byEmail.has(email)) {
    const err = new Error('Email already registered');
    err.status = 409;
    throw err;
  }
  const password_hash = await bcrypt.hash(payload.password, 10);
  const row = {
    id: nextId++,
    name: payload.name,
    email,
    password_hash,
    photo: payload.photo ?? null,
    phone: payload.phone ?? null,
    city: payload.city ?? null,
    country: payload.country ?? null,
    role: 'user',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  byEmail.set(email, row);
  return toPublicUser(row);
}

export async function memoryFindByEmail(email) {
  return byEmail.get(email.toLowerCase()) ?? null;
}

export async function memoryFindById(id) {
  for (const row of byEmail.values()) {
    if (row.id === Number(id)) return row;
  }
  return null;
}

export function memoryToPublic(row) {
  return toPublicUser(row);
}
