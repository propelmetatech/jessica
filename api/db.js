const getKV = () => {
  if (!process.env.KV_REST_API_URL) return null;
  try {
    const { kv } = require('@vercel/kv');
    return kv;
  } catch (err) {
    return null;
  }
};

// ─── Local-only fallback (never runs on Vercel) ───────────────────────────────
const isLocal = process.env.VERCEL !== '1';

const getLocalBookings = () => {
  if (!isLocal) return {};
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'local-bookings.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) || {};
    }
  } catch (err) {
    console.warn('[DB] Could not read local-bookings.json:', err.message);
  }
  return {};
};

const saveLocalBookings = (db) => {
  if (!isLocal) return;
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'local-bookings.json');
    fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.warn('[DB] Could not write local-bookings.json:', err.message);
  }
};
// ─────────────────────────────────────────────────────────────────────────────

const getBookedSlots = async () => {
  try {
    const kv = getKV();
    if (!kv) {
      // On Vercel without KV configured → return empty (safe no-op)
      // Locally → read from local-bookings.json
      return getLocalBookings();
    }
    const data = await kv.get('bookings');
    return data || {};
  } catch (err) {
    console.warn('[DB] Could not fetch from KV:', err.message);
    return {};
  }
};

const addBooking = async (date, time) => {
  try {
    const kv = getKV();
    const db = await getBookedSlots();
    if (!db[date]) db[date] = [];
    if (!db[date].includes(time)) db[date].push(time);

    if (!kv) {
      // On Vercel without KV → logs a warning but does NOT crash
      // Locally → persists to local-bookings.json
      if (isLocal) {
        saveLocalBookings(db);
        console.log(`[DB] Saved booking (local): ${date} @ ${time}`);
      } else {
        console.warn('[DB] KV not configured — booking not persisted in production.');
      }
      return;
    }

    await kv.set('bookings', db);
    console.log(`[DB] Saved booking (KV): ${date} @ ${time}`);
  } catch (err) {
    // Never throw — booking email should still succeed even if persistence fails
    console.error('[DB] Failed to persist booking:', err.message);
  }
};

module.exports = { getBookedSlots, addBooking };
