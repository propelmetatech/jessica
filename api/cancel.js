const { deleteBooking, getBooking } = require('./db.js');
const { sendMerchantCancellationAlert, sendCustomerCancellationAlert } = require('./emailService.js');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  }

  const { eventId, source, customerEmail } = req.query;
  
  if (!eventId) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
      <head><title>Invalid Request</title></head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px; color: #51443c; background-color: #FDFBF7;">
        <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; border: 1px solid #d5c3b9;">
          <h2 style="color: #7E5232;">Invalid Cancellation Link</h2>
          <p>No booking reference was provided in the link.</p>
        </div>
      </body>
      </html>
    `);
  }

  try {
    // 1. Get booking details so we can alert the appropriate party
    const booking = await getBooking(eventId);
    let summary = 'Unknown Booking';
    let dateStr = 'Unknown Date';
    let timeStr = 'Unknown Time';
    
    if (booking) {
      summary = booking.summary;
      if (booking.start && booking.start.dateTime) {
        const startDate = new Date(booking.start.dateTime);
        dateStr = startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Chicago' });
        timeStr = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
      }
    }

    // 2. Delete the booking
    await deleteBooking(eventId);

    // 3. Send email alert based on who cancelled
    if (source === 'merchant' && customerEmail) {
      sendCustomerCancellationAlert({ customerEmail, summary, dateStr, timeStr }).catch(err => {
        console.error('[Cancel] Failed to send customer cancellation alert:', err);
      });
    } else {
      sendMerchantCancellationAlert({ summary, dateStr, timeStr }).catch(err => {
        console.error('[Cancel] Failed to send merchant alert:', err);
      });
    }

    // 4. Return success HTML
    const isMerchant = source === 'merchant';
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancelled</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; padding: 50px 20px; color: #51443c; background-color: #FDFBF7;">
        <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 40px 30px; border-radius: 12px; border: 1px solid #d5c3b9; box-shadow: 0 8px 30px rgba(126,82,50,0.05);">
          <h2 style="color: #7E5232; margin-top: 0;">Appointment Cancelled</h2>
          <p style="line-height: 1.6; margin-bottom: 30px;">
            ${isMerchant 
              ? 'You have successfully cancelled this appointment. The customer has been notified via email, and the event was removed from your Google Calendar.' 
              : 'Your appointment has been successfully cancelled. The slot is now available for others.'}
          </p>
          ${!isMerchant ? '<a href="https://jessicaeyebrowthreading.com" style="display: inline-block; padding: 12px 24px; background-color: #7E5232; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">Book Another Appointment</a>' : ''}
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(`[Cancel API] Failed to delete event ${eventId}:`, err);
    res.setHeader('Content-Type', 'text/html');
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cancellation Failed</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; padding: 50px 20px; color: #51443c; background-color: #FDFBF7;">
        <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 40px 30px; border-radius: 12px; border: 1px solid #d5c3b9; box-shadow: 0 8px 30px rgba(126,82,50,0.05);">
          <h2 style="color: #d9534f; margin-top: 0;">Oops!</h2>
          <p style="line-height: 1.6; margin-bottom: 20px;">We couldn't cancel your appointment. It may have already been cancelled, or the link is expired.</p>
          <p>Please call us at <strong>+1-572-240-5888</strong> if you need further assistance.</p>
        </div>
      </body>
      </html>
    `);
  }
};
