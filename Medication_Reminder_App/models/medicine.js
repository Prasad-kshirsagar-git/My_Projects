const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

module.exports = class Medicine {
  constructor(
    userId,
    medicineName,
    totalDosage,
    scheduleTime,
    RemainingDosage,
    securityKey = null
  ) {
    this.userId = userId;
    this.medicineName = medicineName;
    this.totalDosage = totalDosage;
    this.scheduleTime = scheduleTime;
    this.RemainingDosage = RemainingDosage;

    if (securityKey) {
      this.securityKey = securityKey;
    }
  }

  collectionName = process.env.COLLECTION_MEDICINE;

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
        { $set: { RemainingDosage: remainingDossage } }
      );
    } catch (err) {
      console.error("Error updating RemainingDosage:", err);
    }
  }

};
