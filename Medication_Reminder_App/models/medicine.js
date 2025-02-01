const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const collectionName = process.env.COLLECTION_MEDICINE;

module.exports = class Medicine {
  constructor(
    userId,
    medicineName,
    totalDoses,
    scheduleTime,
    remainingDoses,
    securityKey = null
  ) {
    this.userId = userId;
    this.medicineName = medicineName;
    this.totalDoses = totalDoses;
    this.scheduleTime = scheduleTime;
    this.remainingDoses = remainingDoses;

    if (securityKey) {
      this.securityKey = securityKey;
    }
  }

  async addMedicine() {
    try {
      const db = getDB();
      return await db.collection(collectionName).insertOne(this);
    } catch (err) {
      console.error("Error adding medicine:", err);
      throw err;
    }
  }

  static async getAllMedicinesByKey(userId, securityKey) {
    try {
      const db = getDB();
      return await db
        .collection(collectionName)
        .find({ userId: userId, securityKey: securityKey })
        .toArray();
    } catch (err) {
      console.error("Error fetching all medicines:", err);
      throw err;
    }
  }

  static async getAllMedicinesById(userId) {
    try {
      const db = getDB();
      return await db.collection(collectionName).find({ userId: userId }).toArray();
    } catch (err) {
      console.error("Error fetching all medicines:", err);
      throw err;
    }
  }

  static async findMedicineByKey(userId, medicineName, securityKey) {
    try {
      const db = getDB();
      console.log("Inside findMedicine Method....");
      return await db
        .collection(collectionName)
        .find({
          userId: userId,
          medicineName: medicineName,
          securityKey: securityKey,
        })
        .next();
    } catch (err) {
      console.error("Error finding medicine:", err);
      throw err;
    }
  }

  static async findMedicine(userId, medicineName) {
    try {
      const db = getDB();
      console.log("Inside findMedicine Method....");
      return await db
        .collection(collectionName)
        .find({ userId: userId, medicineName: medicineName })
        .next();
    } catch (err) {
      console.error("Error finding medicine:", err);
      throw err;
    }
  }

  static async findByIdAndDelete(medicineId) {
    try {
      const db = getDB();
      return await db
        .collection(collectionName)
        .deleteOne({ _id: new ObjectId(medicineId) });
    } catch (err) {
      console.error("Error deleting medicine:", err);
      throw err;
    }
  }

  static async findById(medicineId) {
    try {
      const db = getDB();
      return await db
        .collection(collectionName)
        .find({ _id: new ObjectId(medicineId) })
        .next();
    } catch (err) {
      console.error("Error finding medicine:", err);
      throw err;
    }
  }

  static async updateMedicine(medicineId, remainingDossage) {
    try {
      const db = getDB();
      await db.collection(collectionName).updateOne(
        { _id: new ObjectId(medicineId)},
        { $set: { remainingDosage: remainingDossage } }
      );
    } catch (err) {
      console.error("Error updating RemainingDosage:", err);
    }
  }

};
