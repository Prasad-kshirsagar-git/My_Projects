const Medicine = require("../models/medicine");
const UserModule = require("../models/user");
const { ObjectId } = require("mongodb");
const Logs = require("../models/logs");
const twilio = require("twilio");

const appServices = require("./appServices");

exports.deleteMedicineById = async (req, res) => {
  let { id: medicineId } = req.params;

  try {
    const medicineIdObj = new ObjectId(medicineId);
    await Logs.findByIdAndDelete(medicineIdObj);
    const result = await Medicine.findByIdAndDelete(medicineIdObj);

    if(result.affectedRows > 0) {
      req.session.redirectData = {
        ...req.session.redirectData,
        medicineHistory: req.session.redirectData.medicineHistory.filter((medicine) => !medicine._id.equals(medicineIdObj))
      };
      res.status(200).send("Medicine deleted successfully");
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }

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

    await appServices.sendTextSms(res,user,medicine,scheduleTime,phoneNumber);
    await appServices.triggerPhone(res,scheduleTime,phoneNumber);

  } catch (error) {
    console.error("Error setting alarm:", error);
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
    const totalDosage = parseInt(medicine.totalDosage);

    let remainingDoses = parseInt(medicine.remainingDoses);

    remainingDoses = remainingDoses - 1;

    if (remainingDoses < 0) {
      return res.status(200).json({ message: "All dosage taken...!" });
    } else {
      await Medicine.updateMedicine(medicineId, String(remainingDoses));

      let logs;

      if (securityKey) {
        logs = new Logs(
          Date,
          Time,
          userId,
          user.userName,
          medicineId,
          medicineName,
          totalDosage,
          remainingDoses,
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
          totalDosage,
          remainingDoses,
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

