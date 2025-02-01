require("dotenv").config();
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const Agenda = require("agenda");
const { parse } = require("date-fns");

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Agenda Setup
const agenda = new Agenda({
  db: { address: process.env.MONGO_URL },
});

// Event Listeners for Agenda
agenda.on("ready", () => {
  console.log("Agenda connected to MongoDB successfully.");
});

agenda.on("error", (err) => {
  console.error("Agenda connection error:", err);
});

// Start Agenda
(async function () {
  try {
    await agenda.start();
    console.log("Agenda started successfully.");
  } catch (error) {
    console.error("Failed to start Agenda:", error);
  }
})();

// Email Sending Function
exports.sendEmail = async (userName, email, password) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Use your email service (e.g., Gmail, Outlook)
    auth: {
      user: process.env.EMAIL, // Sender's email
      pass: process.env.EMAIL_PASSWORD, // Sender's email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Registration Successful for App",
    html: `
      <h1>Welcome to the App!</h1>
      <p>Hi ${userName},</p>
      <p>Your registration was successful. Here are your details:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Password:</strong> ${password}</li>
      </ul>
      <p>Thank you for registering!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", email);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send registration email.");
  }
};

// SMS Sending Function
exports.sendTextSms = async (
  res,
  user,
  medicine,
  scheduleTime,
  phoneNumber
) => {
 
  if (!twilioPhoneNumber) {
    console.error("Twilio phone number is not configured.");
    res.status(500).send("Server configuration error.");
    return;
  }

  const message = `Hello ${user.userName}, you set an alarm at ${scheduleTime} for ${medicine.medicineName}.`;

  try {
    const sms = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: `+91${phoneNumber}`,
    });
    console.log("SMS sent:", sms.sid);
    res.status(200).send("Alarm set and SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
    if (!res.headersSent) {
      res.status(500).send("Failed to send SMS");
    }
  }
};

// Phone Call Trigger Function
exports.triggerPhone = async (res, scheduleTime, phoneNumber) => {

   const currentDate = new Date();

   // Zero-pad month and day
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Combine current date with schedule time
  const scheduleDateString = `${year}-${month}-${day}T${scheduleTime}:00`;

  console.log("Combined schedule date string:", scheduleDateString);

  // Parse the combined string into a date
  const scheduledDate = new Date(scheduleDateString);

  // Log the scheduled date for debugging
  console.log("Scheduled date:", scheduledDate);
  console.log("Current date:", currentDate);
  
  try {
    await agenda.schedule(scheduledDate, "trigger-phone-call", {
      phoneNumber,
    });
  } catch (error) {
    console.error("Error scheduling alarm:", error);
    res.status(500).send({ error: "Failed to schedule alarm." });
  }
};

// Agenda Job for Phone Calls
agenda.define("trigger-phone-call", async (job) => {
  const { phoneNumber } = job.attrs.data;

  if (!twilioPhoneNumber) {
    console.error("Twilio phone number is not configured for calls.");
    return;
  }

  // Emit alarm triggered event to frontend
  io.emit("alarm-triggered", `It's time to take your medicine`);

  try {
    await client.calls.create({
      url: "https://handler.twilio.com/twiml/EH4c04579ff9ab0982590687e74b2e9202", // Replace with your TwiML URL
      to: `+91${phoneNumber}`,
      from: twilioPhoneNumber,
    });
    console.log(`Call made to ${phoneNumber}`);
  } catch (error) {
    console.error("Error making call:", error);
  }
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
