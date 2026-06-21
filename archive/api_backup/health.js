/**
 * Internal health-check endpoint.
 * Protected by a shared secret (HEALTH_CHECK_SECRET env var).
 * Usage: GET /api/health?secret=YOUR_SECRET
 *
 * Do NOT expose this to the public without the secret — it reveals infrastructure details.
 */
module.exports = (req, res) => {
  const expectedSecret = process.env.HEALTH_CHECK_SECRET;

  // If no secret is configured, reject all requests to prevent accidental exposure
  if (!expectedSecret || req.query.secret !== expectedSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://jessicaeyebrowthreading.com');
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env_check: {
      EMAIL_HOST:        process.env.EMAIL_HOST        ? 'SET' : 'MISSING',
      EMAIL_USER:        process.env.EMAIL_USER        ? 'SET' : 'MISSING',
      EMAIL_PASSWORD:    process.env.EMAIL_PASSWORD    ? 'SET' : 'MISSING',
      EMAIL_FROM:        process.env.EMAIL_FROM        ? 'SET' : 'MISSING',
      EMAIL_REPLY_TO:    process.env.EMAIL_REPLY_TO    ? 'SET' : 'NOT SET (optional)',
      MERCHANT_EMAIL:    process.env.MERCHANT_EMAIL    ? 'SET' : 'MISSING',
      ALLOWED_ORIGIN:    process.env.ALLOWED_ORIGIN    ? 'SET' : 'MISSING (using default)',
      KV_REST_API_URL:   process.env.KV_REST_API_URL   ? 'SET' : 'MISSING (bookings not persistent)',
      HEALTH_CHECK_SECRET: 'SET',
    }
  });
};
