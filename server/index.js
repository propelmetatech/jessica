const express = require('express');
const cors = require('cors');
const { sendCustomerConfirmation, sendMerchantAlert } = require('./emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory tracker for booked slots: { "June 13, 2026": ["11:30 AM CST", "12:00 PM CST"] }
const bookedSlots = {};

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// Endpoint to get all booked slots
app.get('/api/booked-slots', (req, res) => {
  return res.json(bookedSlots);
});

// Main booking endpoint
app.post('/api/book', async (req, res) => {
  const { customer_name, customer_email, customer_phone, service, booking_date, booking_time, total_price } = req.body;

  // Simple validation
  if (!customer_name || !customer_email || !customer_phone || !service || !booking_date || !booking_time) {
    return res.status(400).json({ error: 'Missing required booking details.' });
  }

  // Save the booked slot
  if (!bookedSlots[booking_date]) {
    bookedSlots[booking_date] = [];
  }
  if (!bookedSlots[booking_date].includes(booking_time)) {
    bookedSlots[booking_date].push(booking_time);
  }

  console.log(`[Server] New booking request received for ${customer_name} - ${service}`);

  // Send emails asynchronously (so the customer doesn't wait for SMTP handshakes)
  Promise.allSettled([
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
  ]).then((results) => {
    results.forEach((result, idx) => {
      const type = idx === 0 ? 'Customer Confirmation' : 'Merchant Alert';
      if (result.status === 'rejected') {
        console.error(`[Email Failed] ${type} failed to dispatch:`, result.reason);
      } else {
        console.log(`[Email Dispatched] ${type} complete status: ${result.value ? 'Success' : 'Failed'}`);
      }
    });
  });

  // Instantly return success to the client
  return res.status(200).json({ message: 'Booking request received and is being processed.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server] Jessica Parlour backend listening on port ${PORT}`);
});
