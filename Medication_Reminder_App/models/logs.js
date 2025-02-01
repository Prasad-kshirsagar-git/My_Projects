const { getDB } = require("../config/db");
const collectionName = process.env.COLLECTION_LOGS;

module.exports = class Logs {
  constructor(date,time, userId,userName, medicineId, medicineName,totalDosage,remainingDosage,scheduleTime, securityKey = null) {
    this.date = date;
    this.time = time;
    this.userId = userId;
    this.userName = userName;
    this.medicineId = medicineId;
    this.medicineName = medicineName;
    this.totalDosage = totalDosage;
    this.remainingDosage = remainingDosage;
    this.scheduleTime = scheduleTime;
    if(securityKey) {
      this.securityKey = securityKey;
    }
  } 

  async saveLogs() {
    try {
      const db = getDB();
      return await db.collection(collectionName).insertOne(this);
    } catch (err) {
      console.error("Error adding medicine:", err);
      throw err;
    }
  }

  async getAllLogs() {
    try {
      const db = getDB();
      return await db.collection(collectionName).find().toArray();
    } catch (err) {
      console.error("Error fetching all logs:", err);
      throw err;
    }
  }

  async userLogs(userId, securityKey) {
    try {
      const db = getDB();
      return await db.collection(collectionName).find({userId:userId, securityKey: securityKey}).toArray();
    } catch (err) {
      console.error("Error fetching the log:", err);
      throw err;
    }
  }

  static async findByIdAndDelete(medicineId) {
      try {
        const db = getDB();
        return await db
          .collection(collectionName)
          .deleteOne({ medicineId: medicineId });
      } catch (err) {
        console.error("Error deleting medicine:", err);
        throw err;
      }
    }
}