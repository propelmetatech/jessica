const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

let auth;
let calendarIdCache = 'primary';

const keyPath = path.join(__dirname, '..', 'google-credentials.json');

// Check if we have the JSON file (Local Dev) or Environment Variables (Vercel Prod)
if (fs.existsSync(keyPath)) {
  auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  try {
    calendarIdCache = require('../google-credentials.json').client_email;
  } catch (err) {}
} else if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  // Production (Vercel) - using Environment Variables
  auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Fix escaped newlines
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  calendarIdCache = process.env.GOOGLE_CLIENT_EMAIL;
} else {
  console.error("Missing Google Credentials! Add google-credentials.json or set GOOGLE_CLIENT_EMAIL & GOOGLE_PRIVATE_KEY in .env");
}

const calendar = google.calendar({ version: 'v3', auth });

const getCalendarId = () => {
  return calendarIdCache || 'primary';
};

const parseDateTime = (dateStr, timeStr) => {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
  hours = hours.padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const getBookedSlots = async () => {
  try {
    const calendarId = getCalendarId();
    const now = new Date();
    const timeMax = new Date();
    timeMax.setMonth(timeMax.getMonth() + 3);

    const res = await calendar.events.list({
      calendarId,
      timeMin: now.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items || [];
    const booked = {};

    events.forEach(event => {
      if (!event.start || !event.start.dateTime) return;
      
      const startDate = new Date(event.start.dateTime);
      
      const dateKey = startDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Chicago'
      });
      
      let timeKey = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/Chicago'
      });
      timeKey = timeKey.replace(/\u202f/g, ' ').replace(/am|pm/i, match => match.toUpperCase());
      
      if (!booked[dateKey]) booked[dateKey] = [];
      if (!booked[dateKey].includes(timeKey)) booked[dateKey].push(timeKey);
    });
    
    return booked;
  } catch (err) {
    console.error('[DB] Failed to fetch booked slots from Google Calendar:', err);
    return {};
  }
};

const addBooking = async (dateStr, timeStr, customerName, service, customerEmail) => {
  try {
    const calendarId = getCalendarId();
    
    // e.g. "2026-03-20T10:00:00"
    const startStr = parseDateTime(dateStr, timeStr);
    
    // We can compute the end time by creating a Date object from the string.
    // Appending 'Z' treats it as UTC, which is fine for simple math (+30 mins)
    // as long as we strip the 'Z' when converting back to a floating time string.
    const startObj = new Date(startStr + 'Z');
    if (isNaN(startObj.getTime())) {
      throw new Error(`Invalid date/time: ${dateStr} ${timeStr}`);
    }
    
    // Assume 30 mins per appointment
    const endObj = new Date(startObj.getTime() + 30 * 60000);
    const endStr = endObj.toISOString().replace('.000Z', '');
    
    const event = {
      summary: `Booking: ${service || 'Appointment'} - ${customerName || 'Customer'}`,
      start: {
        dateTime: startStr,
        timeZone: 'America/Chicago',
      },
      end: {
        dateTime: endStr,
        timeZone: 'America/Chicago',
      },
    };

    const res = await calendar.events.insert({
      calendarId,
      resource: event,
    });
    console.log(`[DB] Saved booking to Google Calendar: ${res.data.htmlLink}`);
    return res.data;
  } catch (err) {
    console.error('[DB] Failed to save booking to Google Calendar:', err.message);
    throw err;
  }
};

const deleteBooking = async (eventId) => {
  try {
    const calendarId = getCalendarId();
    await calendar.events.delete({
      calendarId,
      eventId,
    });
    console.log(`[DB] Deleted booking event from Google Calendar: ${eventId}`);
    return true;
  } catch (err) {
    console.error(`[DB] Failed to delete booking ${eventId}:`, err.message);
    throw err;
  }
};

const getBooking = async (eventId) => {
  try {
    const calendarId = getCalendarId();
    const res = await calendar.events.get({
      calendarId,
      eventId,
    });
    return res.data;
  } catch (err) {
    console.error(`[DB] Failed to get booking ${eventId}:`, err.message);
    return null;
  }
};

module.exports = {
  getBookedSlots,
  addBooking,
  deleteBooking,
  getBooking,
};
