const { sendCustomerConfirmation, sendMerchantAlert } = require('./emailService.cjs');

/**
 * Vercel Serverless Function for booking.
 * Vercel expects: module.exports = (req, res) => { ... }
 * Each file in /api becomes its own endpoint automatically.
 */
module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer_name, customer_email, customer_phone, service, booking_date, booking_time, total_price } = req.body;

    // Simple validation
    if (!customer_name || !customer_email || !customer_phone || !service || !booking_date || !booking_time) {
      return res.status(400).json({ error: 'Missing required booking details.' });
    }

    console.log(`[Server] New booking request received for ${customer_name} - ${service}`);

    // Send emails and wait for them to complete before responding
    // In Vercel serverless, background promises are killed when the response is returned
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
