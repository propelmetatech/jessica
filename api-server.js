const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './api/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Vercel serverless environment wrapper
const runHandler = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[API Error]', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
    }
  };
};

// Import Vercel API handlers
const healthHandler = require('./api/health.js');
const bookHandler = require('./api/book.js');
const bookedSlotsHandler = require('./api/booked-slots.js');

// Routes
app.all('/api/health', runHandler(healthHandler));
app.all('/api/book', runHandler(bookHandler));
app.all('/api/booked-slots', runHandler(bookedSlotsHandler));

// Global fallback
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(`[API Server] Running locally at: http://localhost:${PORT}`);
  console.log(`[API Server] Exposing to local network on port ${PORT}`);
  console.log(`===================================================`);
});
