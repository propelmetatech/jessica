const { kv } = require('@vercel/kv');

const getBookedSlots = async () => {
  try {
    // Attempt to fetch from KV. If Vercel KV is not linked, this may fail.
    const data = await kv.get('bookings');
    return data || {};
  } catch (err) {
    console.warn('Could not fetch from KV database (Is it linked in Vercel?). Returning empty object.', err.message);
    return {};
  }
};

const addBooking = async (date, time) => {
  try {
    const db = await getBookedSlots();
    if (!db[date]) {
      db[date] = [];
    }
    if (!db[date].includes(time)) {
      db[date].push(time);
    }
    await kv.set('bookings', db);
  } catch (err) {
    console.error('Failed to add booking to KV:', err.message);
    throw new Error('Database Error: Unable to save booking.');
  }
};

module.exports = { getBookedSlots, addBooking };
