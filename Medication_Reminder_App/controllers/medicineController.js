const Medicine = require("../models/medicine");
const UserModule = require("../models/user");
const { ObjectId } = require("mongodb");
const Logs = require("../models/logs");
const { json } = require("body-parser");
const twilio = require("twilio");

exports.deleteMedicineById = async (req, res) => {
  const { id: medicineId } = req.params;

  try {
    await Medicine.findByIdAndDelete(medicineId);

    await Logs.findByIdAndDelete(medicineId);

    res.status(200).send("Medicine deleted successfully");
  } catch (error) {
    console.error("Error deleting medicine:", error);
    res.status(500).send("Failed to delete medicine");
  }
};

exports.setAlarm = async (req, res) => {
  const { id: medicineId } = req.params;
  const { scheduleTime } = req.body;

  console.log(`medicineId: ${medicineId}, scheduleTime: ${scheduleTime}`);

  console.log("typeof MedicineId is :=> ", typeof medicineId);

  const medicineIdObj = new ObjectId(medicineId);

  try {
    const medicine = await Medicine.findById(medicineIdObj);

    if (!medicine) {
      return res.status(404).send("Medicine not found");
    }

    const userId = req.session.userId;
    const userIdObj = new ObjectId(userId);
    const user = await UserModule.findUserById(userIdObj);

    if (!user) {
      return res.status(404).send("user not found");
    }

    const userName = user.userName;
    const phoneNumber = user.number;

    const accountSid = process.env.TWILIO_ACCOUNT_SID; // Replace with your Twilio Account SID
    const authToken = process.env.TWILIO_AUTH_TOKEN; // Replace with your Twilio Auth Token
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Replace with your Twilio phone number

    const client = twilio(accountSid, authToken);

    const message = `Hello ${userName}, you set an alarm at ${scheduleTime} for ${medicine.medicineName}.`;

    // Send SMS using Twilio
    client.messages
      .create({
        body: message,
        from: twilioPhoneNumber,
        to: "+91" + phoneNumber, // Ensure this is in the correct format (+1XXXXXXXXXX)
      })
      .then((message) => {
        console.log("SMS sent:", message.sid);
        res.status(200).send("Alarm set and SMS sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
        res.status(500).send("Failed to send SMS");
      });
  } catch (error) {
    console.error("Error setting alarm:", error);
    res.status(500).send("Failed to set alarm");
  }
};

exports.medicineTaken = async (req, res) => {
  const { scheduleTime, medicineName } = req.body;
  const { id: medicineId } = req.params;

  const Now = new Date();

  try {
    const userId = req.session.userId;
    const userIdObj = new ObjectId(userId);
    const user = await UserModule.findUserById(userIdObj);

    const Date = Now.toISOString().split("T")[0];
    const Time = Now.toLocaleTimeString();

    const securityKey = req.session.securityKey;

    const medicine = await Medicine.findById(medicineId);
    let RemainingDosage = parseInt(medicine.RemainingDosage);

    RemainingDosage = RemainingDosage - 1;

    if (RemainingDosage < 0) {
      return res.status(200).json({ message: "All dosage taken...!" });
    } else {
      await Medicine.updateMedicine(medicineId, String(RemainingDosage));

      let logs;

      if (securityKey) {
        logs = new Logs(
          Date,
          Time,
          userId,
          user.userName,
          medicineId,
          medicineName,
          scheduleTime,
          securityKey
        );
      } else {
        logs = new Logs(
          Date,
          Time,
          userId,
          user.userName,
          medicineId,
          medicineName,
          scheduleTime
        );
      }

      await logs.saveLogs();

      let medicineHistory = [];
      let medicines;
      if (securityKey) {
        medicines = await Medicine.getAllMedicinesByKey(userId, securityKey);
      } else {
        medicines = await Medicine.getAllMedicinesById(userId.toString());
      }

      medicines.forEach((medicine) => {
        medicineHistory.push(medicine);
      });

      req.session.redirectData = {
        user: { userName: user.userName },
        notifications: "Be Strong, Be Healthy",
        medicineHistory,
      };
    }

    return res.status(200).json({ message: "Medicine marked as taken" });
    
  } catch (error) {
    console.error("Error updating medicine status:", error);
    res.status(500).json({ message: "Failed to update medicine status" });

  } 
}

