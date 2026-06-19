const { sendCustomerConfirmation, sendMerchantAlert } = require('./emailService.js');
const { addBooking, getBookedSlots } = require('./db.js');

// ─── CORS helper — only allow requests from our production domain ─────────────
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://jessicaeyebrowthreading.com';

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};
// ─────────────────────────────────────────────────────────────────────────────

// ─── Simple email format validator ───────────────────────────────────────────
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// ─────────────────────────────────────────────────────────────────────────────

// ─── KV-based rate limiting (10 requests / IP / 15 minutes) ──────────────────
// Gracefully degrades to no-op when KV is not configured (e.g., local dev).
const RATE_LIMIT_MAX      = 10;
const RATE_LIMIT_WINDOW_S = 15 * 60; // 15 minutes in seconds

const checkRateLimit = async (ip) => {
  let kv;
  try {
    if (!process.env.KV_REST_API_URL) return { allowed: true };
    const { kv: _kv } = require('@vercel/kv');
    kv = _kv;
  } catch {
    return { allowed: true };
  }

  const key = `rate:book:${ip}`;
  try {
    const count = await kv.incr(key);
    if (count === 1) {
      // First request in window — set TTL
      await kv.expire(key, RATE_LIMIT_WINDOW_S);
    }
    if (count > RATE_LIMIT_MAX) {
      const ttl = await kv.ttl(key);
      return { allowed: false, retryAfter: ttl };
    }
    return { allowed: true };
  } catch (err) {
    // If KV is unavailable, allow the request rather than blocking all users
    console.warn('[RateLimit] KV check failed — skipping rate limit:', err.message);
    return { allowed: true };
  }
};
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Vercel Serverless Function for booking.
 * Vercel expects: module.exports = (req, res) => { ... }
 * Each file in /api becomes its own endpoint automatically.
 */
module.exports = async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limit check ──────────────────────────────────────────────────────
  const clientIp = (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown'
  ).trim();

  const { allowed, retryAfter } = await checkRateLimit(clientIp);
  if (!allowed) {
    res.setHeader('Retry-After', retryAfter ?? 900);
    return res.status(429).json({ error: 'Too many booking requests. Please try again later.' });
  }
  // ─────────────────────────────────────────────────────────────────────────

  try {
    const { customer_name, customer_email, customer_phone, service, booking_date, booking_time, total_price } = req.body;

    // ── Input validation ──────────────────────────────────────────────────
    if (!customer_name || !customer_email || !customer_phone || !service || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Missing required booking details.' });
    }

    if (!isValidEmail(customer_email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Prevent absurdly long inputs
    if (
      customer_name.length > 100  ||
      customer_email.length > 254 ||
      customer_phone.length > 30  ||
      service.length > 500
    ) {
      return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
    }
    // ─────────────────────────────────────────────────────────────────────

    const booked = await getBookedSlots();
    if (booked[booking_date] && booked[booking_date].includes(booking_time)) {
      return res.status(409).json({ error: 'This slot is already booked. Please choose another time.' });
    }

    await addBooking(booking_date, booking_time);

    console.log(`[Server] New booking request received for ${customer_name} - ${service}`);

    // Send emails and wait for them to complete before responding.
    // In Vercel serverless, background promises are killed when the response is returned.
    const results = await Promise.allSettled([
      sendCustomerConfirmation({
        customer_name,
        customer_email,
        service,
        booking_date,
        booking_time,
        total_price
      }),
      sendMerchantAlert({
        customer_name,
        customer_email,
        customer_phone,
        service,
        booking_date,
        booking_time,
        total_price
      })
    ]);

    results.forEach((result, idx) => {
      const type = idx === 0 ? 'Customer Confirmation' : 'Merchant Alert';
      if (result.status === 'rejected') {
        console.error(`[Email Failed] ${type} failed to dispatch:`, result.reason);
      } else {
        console.log(`[Email Dispatched] ${type} complete status: ${result.value ? 'Success' : 'Failed'}`);
      }
    });

    return res.status(200).json({ message: 'Booking request received and processed.' });
  } catch (error) {
    console.error('[Server Error]', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
