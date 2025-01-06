const { getDB } = require("../config/db");

module.exports = class Logs {
  constructor(date,time, userId,userName, medicineId, medicineName,scheduleTime, securityKey = null) {
    this.date = date;
    this.time = time;
    this.userId = userId;
    this.userName = userName;
    this.medicineId = medicineId;
    this.medicineName = medicineName;
    this.scheduleTime = scheduleTime;
    if(securityKey) {
      this.securityKey = securityKey;
    }
  } 

  collectionName = process.env.COLLECTION_LOGS;

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
}