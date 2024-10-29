// // server.js
// const express = require('express');
// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// const path = require('path'); // Import path for handling file paths

// // Initialize environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to parse JSON data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the "public" folder
// app.use(express.static('public'));

// // Serve the dashboard page
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dashboard.html'));
// });

// // Serve the booking page
// app.get('/booking', (req, res) => {
//   res.sendFile(path.join(__dirname, 'booking.html'));
// });

// // Configure nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Handle form submission and send confirmation email
// app.post('/api/book', (req, res) => {
//   const { name, phone, email, address, crop } = req.body;

//   // Email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Soil Test Booking Confirmation',
//     text: `Hello ${name},\n\nThank you for booking a soil test with us. Here are your details:\n\n
//            Name: ${name}
//            Phone: ${phone}
//            Email: ${email}
//            Address: ${address}
//            Crop Interest: ${crop}\n\n
//            You will receive further instructions shortly.\n\nThank you!\nSoil Test Team`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ message: 'Error sending email' });
//     }
//     console.log('Email sent: ' + info.response);
//     res.status(200).json({ message: 'Booking confirmed. Email sent!' });
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path'); // Import path for handling file paths

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root and public folder
app.use(express.static(path.join(__dirname))); // Serve files in the root directory
app.use(express.static(path.join(__dirname, 'public'))); // Serve files in the public directory

// Serve the dashboard page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Serve the booking page
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Handle form submission and send confirmation email
app.post('/api/book', (req, res) => {
  const { name, phone, email, address, crop } = req.body;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Soil Test Booking Confirmation',
    text: `Hello ${name},\n\nThank you for booking a soil test with us. Here are your details:\n\n
           Name: ${name}
           Phone: ${phone}
           Email: ${email}
           Address: ${address}
           Crop Interest: ${crop}\n\n
           You will receive further instructions shortly.\n\nThank you!\nSoil Test Team`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Booking confirmed. Email sent!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
