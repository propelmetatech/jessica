/**
 * Simple health-check endpoint.
 * Visit /api/health in your browser — if you see JSON, functions work.
 */
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env_check: {
      EMAIL_HOST: process.env.EMAIL_HOST ? 'SET' : 'MISSING',
      EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
      EMAIL_FROM: process.env.EMAIL_FROM ? 'SET' : 'MISSING',
      MERCHANT_EMAIL: process.env.MERCHANT_EMAIL ? 'SET' : 'MISSING',
    }
  });
};
