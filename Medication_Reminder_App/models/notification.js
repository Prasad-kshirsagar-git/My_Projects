
module.exports = class nofication {
  static async sendMail() {
    const medicine = await Medicine.findById(id);
    const [hours, minutes] = alarmTime.split(":");

    // Set alarm using node-schedule
    schedule.scheduleJob(`${minutes} ${hours} * * *`, () => {
      // Send email or notification
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com",
          pass: "your-email-password",
        },
      });

      const mailOptions = {
        from: "your-email@gmail.com",
        to: "user-email@example.com",
        subject: "Medicine Alarm",
        text: `It's time to take your medicine: ${medicine.medicineName}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  }
};
