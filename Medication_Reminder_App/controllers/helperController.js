const Medicine = require("../models/medicine");

module.exports = class helperController {
  schedule = require("node-schedule");
  nodemailer = require("nodemailer");

  // redirectUrl: async (user) => {

  static async redirectUrl(req, user) {
    let notifications = "There is No New Notification";

    const userId = String(req.session.userId);

    const securityKey = req.session.securityKey;

    let medicineHistory = [];
    let medicines;

    try {
      if (securityKey) {
        medicines = await Medicine.getAllMedicinesByKey(userId, securityKey);
      } else {
        medicines = await Medicine.getAllMedicinesById(userId.toString());
      }

      if (medicines && medicines.length > 0) {
        medicines.forEach((medicine) => {
          medicineHistory.push(medicine);
          notifications = "Be Strong, Be Healthy";
        });
      }
    } catch (err) {
      console.error("Error fetching medicines:", err);
    }

    const redirectUrl =
      user.role === "Doctor" ? "/admin/admin_dashboard" : "/user/dashboard";

    req.session.redirectData = {
      user: { userName: user.userName },
      notifications,
      medicineHistory,
    };

    return redirectUrl;
  }
};
