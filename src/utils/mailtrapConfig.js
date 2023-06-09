// const nodemailer = require("nodemailer");

// // Create the SMTP transport
// const transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "9378cac3f4f17b",
//     pass: "1f597a9b13a0cc",
//   },
// });

// module.exports = transport;

import nodemailer from "nodemailer";

const sendTestEmail = async (email) => {
  // Create the SMTP transport
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9378cac3f4f17b",
      pass: "1f597a9b13a0cc",
    },
  });

  // Create the email message
  const message = {
    from: "your-email@example.com",
    to: email,
    subject: "Test Email",
    text: "This is a test email from Mailtrap.",
  };

  // Send the email
  try {
    await transport.sendMail(message);
    console.log("Test email sent successfully");
  } catch (error) {
    console.error("Failed to send test email", error);
  }
};
