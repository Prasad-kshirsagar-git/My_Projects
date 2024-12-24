const medicine = require("../models/medicine");

module.exports = class helperController {
  static async redirectUrl(user) {
    let notifications = "There is No New Notification";
    let reminders = [];

    try {
      const medicines = await medicine.getAllMedicine();
      if (medicines && medicines.length > 0) {
        medicines.forEach((medicine) => {
          if (medicine.status === "not_Taken") {
            console.log("Medicine found with status 'not_Taken'");
            reminders.push(medicine);
            notifications = "Be Strong, Be Healthy";
          }
        });
      }
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }

    const redirectUrl = `/user/dashboard?user=${encodeURIComponent(JSON.stringify({ userName: user.userName }))}&notifications=${encodeURIComponent(notifications)}&reminders=${encodeURIComponent(JSON.stringify(reminders))}&userId=${encodeURIComponent(user._id)}`;

    return redirectUrl;
  }
};
