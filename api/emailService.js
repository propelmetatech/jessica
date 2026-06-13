const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // false for port 587 (TLS), true for port 465 (SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Sends a booking confirmation email to the customer.
 */
async function sendCustomerConfirmation({ customer_name, customer_email, service, booking_date, booking_time, total_price }) {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM}>`,
    to: customer_email,
    subject: `Your Booking is Confirmed — ${service} on ${booking_date}`,
    text: `Hello ${customer_name},\n\nYour appointment is confirmed!\n\nService: ${service}\nTotal Price: ${total_price}\nDate: ${booking_date}\nTime: ${booking_time}\n\nLocation: 4503 Northwest 36th Street, Oklahoma City, OK 73122\nPhone: +1-572-240-5888\n\nWe look forward to seeing you!\n- Jessica Eyebrow Threading`,
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
            <p>Hello <strong>${customer_name}</strong>,</p>
            <p>Thank you for booking with us! Your appointment has been successfully scheduled and confirmed.</p>
            
            <div class="details-card">
              <div class="details-row">
                <span class="details-label">Service(s):</span>
                <span class="details-val">${service}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Total Price:</span>
                <span class="details-val" style="font-weight: bold; color: #7E5232;">${total_price}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Date:</span>
                <span class="details-val">${booking_date}</span>
              </div>
              <div class="details-row">
                <span class="details-label">Time:</span>
                <span class="details-val">${booking_time}</span>
              </div>
            </div>

            <p><strong>Our Location:</strong><br>
            4503 Northwest 36th Street, Oklahoma City, OK 73122<br>
            Phone: <a href="tel:+15722405888" style="color: #7E5232;">+1-572-240-5888</a></p>
            
            <p style="margin-bottom: 0;">If you need to reschedule or cancel your visit, please call us at least 24 hours in advance.</p>
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
async function sendMerchantAlert({ customer_name, customer_email, customer_phone, service, booking_date, booking_time, total_price }) {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'Jessica Eyebrow Threading'}" <${process.env.EMAIL_FROM}>`,
    to: process.env.MERCHANT_EMAIL || 'renexatechnologies@gmail.com',
    subject: `New Booking — ${customer_name} — ${booking_date} ${booking_time}`,
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
              <td>${customer_name}</td>
            </tr>
            <tr>
              <th>Customer Email</th>
              <td><a href="mailto:${customer_email}">${customer_email}</a></td>
            </tr>
            <tr>
              <th>Customer Phone</th>
              <td><a href="tel:${customer_phone}">${customer_phone}</a></td>
            </tr>
            <tr>
              <th>Service(s)</th>
              <td>${service}</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td><strong>${total_price}</strong></td>
            </tr>
            <tr>
              <th>Date</th>
              <td>${booking_date}</td>
            </tr>
            <tr>
              <th>Time</th>
              <td>${booking_time}</td>
            </tr>
          </table>
          
          <p>Please review and update the master schedule accordingly.</p>
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

module.exports = {
  sendCustomerConfirmation,
  sendMerchantAlert
};
