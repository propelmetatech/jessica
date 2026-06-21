const nodemailer = require('nodemailer');
// Note: dotenv is NOT needed on Vercel — env vars are injected by the platform.
// Only use dotenv for local development.
if (process.env.NODE_ENV !== 'production') {
  try { require('dotenv').config({ path: require('path').join(__dirname, '.env') }); } catch (e) { /* dotenv not installed */ }
}

// ─── Startup env-check (visible in Vercel function logs on cold start) ────────
const REQUIRED_ENV = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD', 'EMAIL_FROM', 'MERCHANT_EMAIL'];
const missingEnv = REQUIRED_ENV.filter(key => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`[EmailService] ⚠️  Missing env vars: ${missingEnv.join(', ')} — emails will fail!`);
} else {
  console.log('[EmailService] ✅ All email env vars are present.');
}
// ─────────────────────────────────────────────────────────────────────────────

// Create transporter using environment variables.
// IMPORTANT: EMAIL_FROM must match or be an alias of EMAIL_USER (the SMTP-authenticated sender).
// Setting a From: header to a different domain will fail SPF/DKIM checks and be flagged as spam.
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // false for port 587 (TLS), true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verify SMTP connection on cold start so misconfigurations appear in Vercel logs immediately.
transporter.verify((error) => {
  if (error) {
    console.error('[EmailService] ❌ SMTP connection failed:', error.message);
  } else {
    console.log('[EmailService] ✅ SMTP connection verified — ready to send.');
  }
});

// ─── HTML escape helper — prevents XSS / malicious markup in email bodies ────
const escapeHtml = (str) => {
  if (typeof str !== 'string') return String(str ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sends a booking confirmation email to the customer.
 */
async function sendCustomerConfirmation({ customer_name, customer_email, service, booking_date, booking_time, total_price, eventId, startTime, endTime }) {
  // The From address MUST match the SMTP-authenticated sender (EMAIL_USER).
  // If you want replies to go to a different address, use replyTo.
  const fromAddress = `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
  const replyToAddress = process.env.EMAIL_REPLY_TO || undefined;

  // Escape all user-supplied values before embedding in HTML
  const safeName    = escapeHtml(customer_name);
  const safeService = escapeHtml(service);
  const safeDate    = escapeHtml(booking_date);
  const safeTime    = escapeHtml(booking_time);
  const safePrice   = escapeHtml(total_price);
  const safeEventId = eventId ? encodeURIComponent(eventId) : '';
  const baseUrl     = process.env.API_BASE_URL || 'https://jessicaeyebrowthreading.com';
  const cancelLink  = safeEventId ? `${baseUrl}/api/cancel?eventId=${safeEventId}` : '';

  // Generate calendar dates for ICS and Google link
  let icsContent = '';
  let googleCalLink = '';
  if (startTime && endTime) {
    const formatICSDate = (ds) => new Date(ds).toISOString().replace(/[-:]/g, '').replace('.000', '');
    const icsStart = formatICSDate(startTime);
    const icsEnd = formatICSDate(endTime);
    const icsNow = formatICSDate(new Date());

    icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Jessica Eyebrow Threading//EN
METHOD:REQUEST
BEGIN:VEVENT
UID:${eventId || Date.now()}@jessicaeyebrowthreading.com
DTSTAMP:${icsNow}
DTSTART:${icsStart}
DTEND:${icsEnd}
SUMMARY:Jessica Eyebrow Threading - ${service}
DESCRIPTION:Appointment for ${service}.
LOCATION:4503 Northwest 36th Street, Oklahoma City, OK 73122
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const gcalTitle = encodeURIComponent(`Jessica Eyebrow Threading - ${service}`);
    const gcalDetails = encodeURIComponent(`Appointment for ${service}.`);
    const gcalLocation = encodeURIComponent(`4503 Northwest 36th Street, Oklahoma City, OK 73122`);
    googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${gcalTitle}&dates=${icsStart}/${icsEnd}&details=${gcalDetails}&location=${gcalLocation}`;
  }

  const mailOptions = {
    from: fromAddress,
    ...(replyToAddress && { replyTo: replyToAddress }),
    to: customer_email,
    subject: `Your Booking is Confirmed — ${safeService} on ${safeDate}`,
    ...(icsContent && {
      attachments: [
        {
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; method=REQUEST'
        }
      ]
    }),
    text: `Hello ${customer_name},\n\nYour appointment is confirmed!\n\nService: ${service}\nTotal Price: ${total_price}\nDate: ${booking_date}\nTime: ${booking_time}\n\nLocation: 4503 Northwest 36th Street, Oklahoma City, OK 73122\nPhone: +1-572-240-5888\n\n${cancelLink ? `To cancel your booking, visit: ${cancelLink}\n\n` : ''}We look forward to seeing you!\n- Jessica Eyebrow Threading`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #FDFBF7;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            color: #51443c;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #F2EAE0;
            border: 1px solid #d5c3b9;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(126,82,50,0.05);
          }
          .header {
            background-color: #7E5232;
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 300;
            letter-spacing: 1px;
          }
          .content {
            padding: 30px 40px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px 0;
          }
          .details-card {
            background-color: #ffffff;
            border: 1px solid #d5c3b9;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
          }
          .details-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #f4eeeb;
          }
          .details-row:last-child {
            border-bottom: none;
          }
          .details-label {
            font-weight: bold;
            color: #7E5232;
          }
          .details-val {
            color: #1c1c19;
          }
          .btn-cancel {
            display: inline-block;
            margin-top: 15px;
            padding: 12px 24px;
            background-color: #e5dfdb;
            color: #7E5232;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
          }
          .btn-calendar {
            display: inline-block;
            margin-top: 15px;
            margin-right: 10px;
            padding: 12px 24px;
            background-color: #4285F4;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
          }
          .footer {
            background-color: #f7efe6;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #8c7d74;
            border-top: 1px solid #d5c3b9;
          }
          .footer a {
            color: #7E5232;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Jessica Eyebrow Threading</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${safeName}</strong>,</p>
            <p>Thank you for booking with us! Your appointment has been successfully scheduled and confirmed.</p>
            
            <div class="details-card">
              <div class="details-row">
                <span class="details-label">Service(s):</span>
                <span class="details-val">${safeService}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Total Price:</span>
                <span class="details-val" style="font-weight: bold; color: #7E5232;">${safePrice}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Date:</span>
                <span class="details-val">${safeDate}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Time:</span>
                <span class="details-val">${safeTime}</span>
              </div>
            </div>

            <p><strong>Our Location:</strong><br>
            4503 Northwest 36th Street, Oklahoma City, OK 73122<br>
            Phone: <a href="tel:+15722405888" style="color: #7E5232;">+1-572-240-5888</a></p>
            
            ${googleCalLink ? `<p style="margin-top: 30px; text-align: center;"><a href="${googleCalLink}" class="btn-calendar" target="_blank">Add to Google Calendar</a></p>` : ''}
            
            ${cancelLink ? `<p style="margin-top: 15px; text-align: center;">Need to cancel your visit? <br><a href="${cancelLink}" class="btn-cancel">Cancel Booking</a></p>` : `<p style="margin-bottom: 0;">If you need to reschedule or cancel your visit, please call us at least 24 hours in advance.</p>`}
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Jessica Eyebrow Threading. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Customer confirmation sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Error] Failed to send customer confirmation:', error);
    // Log error, do not throw or crash
    return null;
  }
}

/**
 * Sends a new booking alert email to the merchant.
 */
async function sendMerchantAlert({ customer_name, customer_email, customer_phone, service, booking_date, booking_time, total_price, eventId }) {
  const fromAddress = `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
  const replyToAddress = process.env.EMAIL_REPLY_TO || undefined;
  const baseUrl = process.env.API_BASE_URL || 'https://jessicaeyebrowthreading.com';

  // Escape all user-supplied values before embedding in HTML
  const safeName    = escapeHtml(customer_name);
  const safeEmail   = escapeHtml(customer_email);
  const safePhone   = escapeHtml(customer_phone);
  const safeService = escapeHtml(service);
  const safeDate    = escapeHtml(booking_date);
  const safeTime    = escapeHtml(booking_time);
  const safePrice   = escapeHtml(total_price);
  const safeEventId = eventId ? encodeURIComponent(eventId) : '';
  const merchantCancelLink = safeEventId ? `${baseUrl}/api/cancel?eventId=${safeEventId}&source=merchant&customerEmail=${encodeURIComponent(customer_email)}` : '';

  const mailOptions = {
    from: fromAddress,
    ...(replyToAddress && { replyTo: replyToAddress }),
    to: process.env.MERCHANT_EMAIL,
    subject: `New Booking — ${safeName} — ${safeDate} ${safeTime}`,
    text: `New booking received!\n\nCustomer Details:\n- Name: ${customer_name}\n- Email: ${customer_email}\n- Phone: ${customer_phone}\n\nBooking Details:\n- Service(s): ${service}\n- Total Price: ${total_price}\n- Date: ${booking_date}\n- Time: ${booking_time}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Booking Alert</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          h2 {
            color: #7E5232;
            border-bottom: 2px solid #7E5232;
            padding-bottom: 10px;
            margin-top: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid #eeeeee;
          }
          th {
            background-color: #f9f9f9;
            font-weight: bold;
            width: 30%;
            color: #7E5232;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Booking Alert</h2>
          <p>A new appointment has been scheduled through the website booking system. Here are the details:</p>
          
          <table>
            <tr>
              <th>Customer Name</th>
              <td>${safeName}</td>
            </tr>
            <tr>
              <th>Customer Email</th>
              <td><a href="mailto:${safeEmail}">${safeEmail}</a></td>
            </tr>
            <tr>
              <th>Customer Phone</th>
              <td><a href="tel:${safePhone}">${safePhone}</a></td>
            </tr>
            <tr>
              <th>Service(s)</th>
              <td>${safeService}</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td><strong>${safePrice}</strong></td>
            </tr>
            <tr>
              <th>Date</th>
              <td>${safeDate}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>${safeTime}</td>
            </tr>
          </table>
          
          <p>Please review and update the master schedule accordingly.</p>
          ${merchantCancelLink ? `
            <div style="margin-top: 30px; text-align: center;">
              <p style="color: #d9534f; font-weight: bold; margin-bottom: 10px;">Need to cancel this appointment?</p>
              <a href="${merchantCancelLink}" style="display: inline-block; padding: 12px 24px; background-color: #d9534f; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">Cancel Appointment</a>
              <p style="font-size: 12px; color: #777; margin-top: 10px;">Clicking this will delete the event from your calendar and email the customer to let them know.</p>
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Merchant alert sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Error] Failed to send merchant alert:', error);
    // Log error, do not throw or crash
    return null;
  }
}

/**
 * Sends a cancellation alert email to the merchant.
 */
async function sendMerchantCancellationAlert({ summary, dateStr, timeStr }) {
  const merchantEmail = process.env.MERCHANT_EMAIL;
  if (!merchantEmail) {
    console.warn('[Email Warning] MERCHANT_EMAIL not set. Skipping cancellation alert.');
    return;
  }

  const fromAddress = `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
  const safeSummary = escapeHtml(summary || 'Unknown Service/Customer');
  const safeDate = escapeHtml(dateStr || 'Unknown Date');
  const safeTime = escapeHtml(timeStr || 'Unknown Time');

  const mailOptions = {
    from: fromAddress,
    to: merchantEmail,
    subject: `[CANCELLED] Appointment: ${safeSummary}`,
    text: `An appointment has been cancelled.\n\nDetails:\n${safeSummary}\nDate: ${safeDate}\nTime: ${safeTime}\n\nThis event has been removed from your Google Calendar.`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #d9534f;">Appointment Cancelled</h2>
        <p>A customer has cancelled their appointment. It has been removed from your Google Calendar.</p>
        <table style="text-align: left; border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Details</th><td style="padding: 8px; border: 1px solid #ddd;">${safeSummary}</td></tr>
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Date</th><td style="padding: 8px; border: 1px solid #ddd;">${safeDate}</td></tr>
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Time</th><td style="padding: 8px; border: 1px solid #ddd;">${safeTime}</td></tr>
        </table>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Merchant cancellation alert sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Error] Failed to send merchant cancellation alert:', error);
    return null;
  }
}

/**
 * Sends a cancellation alert email to the customer (when merchant cancels).
 */
async function sendCustomerCancellationAlert({ customerEmail, summary, dateStr, timeStr }) {
  if (!customerEmail) return;

  const fromAddress = `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`;
  const replyToAddress = process.env.EMAIL_REPLY_TO || undefined;
  const safeSummary = escapeHtml(summary || 'Unknown Service');
  const safeDate = escapeHtml(dateStr || 'Unknown Date');
  const safeTime = escapeHtml(timeStr || 'Unknown Time');

  const mailOptions = {
    from: fromAddress,
    ...(replyToAddress && { replyTo: replyToAddress }),
    to: customerEmail,
    subject: `Update on your Booking: ${safeSummary}`,
    text: `Hello,\n\nUnfortunately, we had to cancel your upcoming appointment.\n\nDetails:\n${safeSummary}\nDate: ${safeDate}\nTime: ${safeTime}\n\nWe apologize for any inconvenience. Please visit our website to rebook or call us at +1-572-240-5888.\n\n- Jessica Eyebrow Threading`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2>Appointment Cancelled</h2>
        <p>Hello,</p>
        <p>Unfortunately, we had to cancel your upcoming appointment.</p>
        <table style="text-align: left; border-collapse: collapse; width: 100%; max-width: 500px; margin-bottom: 20px;">
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Details</th><td style="padding: 8px; border: 1px solid #ddd;">${safeSummary}</td></tr>
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Date</th><td style="padding: 8px; border: 1px solid #ddd;">${safeDate}</td></tr>
          <tr><th style="padding: 8px; border: 1px solid #ddd;">Time</th><td style="padding: 8px; border: 1px solid #ddd;">${safeTime}</td></tr>
        </table>
        <p>We sincerely apologize for the inconvenience. Please <a href="https://jessicaeyebrowthreading.com">visit our website</a> to rebook for another time, or call us at <strong>+1-572-240-5888</strong>.</p>
        <p>- Jessica Eyebrow Threading</p>
      </body>
      </html>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] Customer cancellation alert sent. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Error] Failed to send customer cancellation alert:', error);
    return null;
  }
}

module.exports = {
  sendCustomerConfirmation,
  sendMerchantAlert,
  sendMerchantCancellationAlert,
  sendCustomerCancellationAlert
};
