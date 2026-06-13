/**
 * Vercel Serverless Function for booked slots.
 *
 * NOTE: In serverless environments, in-memory state does NOT persist
 * between invocations. Each request runs in a fresh or cold-started
 * container. This endpoint will always return an empty object.
 * For production, connect to a database (e.g., Supabase, Firebase, MongoDB).
 */
module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return empty — serverless has no persistent memory
  return res.json({});
};
