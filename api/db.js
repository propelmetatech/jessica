const getKV = () => {
  try {
    const { kv } = require('@vercel/kv');
    return kv;
  } catch (err) {
    return null;
  }
};

const getBookedSlots = async () => {
  try {
    const kv = getKV();
    if (!kv) return {};
    const data = await kv.get('bookings');
    return data || {};
  } catch (err) {
    console.warn('[DB] Could not fetch from KV (Is it linked in Vercel?):', err.message);
    return {};
  }
};

const addBooking = async (date, time) => {
  try {
    const kv = getKV();
    if (!kv) {
      console.warn('[DB] KV not available — skipping slot persistence.');
      return;
    }
    const db = await getBookedSlots();
    if (!db[date]) {
      db[date] = [];
    }
    if (!db[date].includes(time)) {
      db[date].push(time);
    }
    await kv.set('bookings', db);
    console.log(`[DB] Saved booking: ${date} @ ${time}`);
  } catch (err) {
    // Log but do NOT throw — booking should still succeed even if KV fails
    console.error('[DB] Failed to persist booking to KV:', err.message);
  }
};

module.exports = { getBookedSlots, addBooking };
