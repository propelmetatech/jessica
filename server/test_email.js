const { sendCustomerConfirmation, sendMerchantAlert } = require('./emailService');
require('dotenv').config();

// Get target email from command line args
const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error('\n❌ Error: Please provide an email address to test with.\n');
  console.log('Usage: node test_email.js <your_email@example.com>\n');
  process.exit(1);
}

const testBooking = {
  customer_name: 'Jane Doe',
  customer_email: targetEmail,
  customer_phone: '+1 (572) 240-5888',
  service: 'Eyebrow Threading & Facial Waxing Combo',
  booking_date: 'Saturday, June 20, 2026',
  booking_time: '2:30 PM CST'
};

async function runTest() {
  console.log(`\n⏳ Attempting to send test emails to: ${targetEmail}...\n`);
  
  console.log('1. Dispatching Customer Confirmation email...');
  const customerResult = await sendCustomerConfirmation(testBooking);
  if (customerResult) {
    console.log('✅ Customer Confirmation sent successfully!');
  } else {
    console.log('❌ Customer Confirmation failed (check log above).');
  }

  console.log('\n2. Dispatching Merchant Alert email...');
  // Overwriting merchant email temporarily for test
  process.env.MERCHANT_EMAIL = targetEmail;
  const merchantResult = await sendMerchantAlert(testBooking);
  if (merchantResult) {
    console.log('✅ Merchant Alert sent successfully!');
  } else {
    console.log('❌ Merchant Alert failed (check log above).');
  }

  console.log('\n✨ Test execution finished.\n');
}

runTest();
