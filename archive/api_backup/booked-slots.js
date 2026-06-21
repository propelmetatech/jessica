/**
 * Vercel Serverless Function — returns booked time slots for the calendar UI.
 * Reads from Vercel KV in production, or from local-bookings.json during local development.
 */
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://jessicaeyebrowthreading.com';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { getBookedSlots } = require('./db.js');
  const slots = await getBookedSlots();
  return res.json(slots);
};
