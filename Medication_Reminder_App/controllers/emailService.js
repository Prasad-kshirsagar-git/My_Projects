const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

exports.sendRegistrationEmail = async (userName, email, password) => {
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // Receiver address
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
