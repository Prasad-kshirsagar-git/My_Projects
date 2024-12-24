const mysql = require("mysql2");
const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtils");

module.exports = class Medicine {
  constructor(medicineName, dosage,scheduleTime, status) {
    this.medicineName = medicineName;
    this.dosage = dosage;
    this.scheduleTime = scheduleTime;
    this.status = status;
    
  }

  addMedicine() {

    const db = getDB();
    return db.collection("medicine").insertOne(this);
  }

  static getAllMedicine() {
    const db = getDB();
    return db.collection("medicine").find().toArray();
  }

  static findMedicine(medicineName) {
    const db = getDB();
    return db.collection("medicine").find({ medicineName: medicineName }).next();
  }
};
