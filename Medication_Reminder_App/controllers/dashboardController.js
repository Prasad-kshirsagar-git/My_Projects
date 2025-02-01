const Medicine = require("../models/medicine");
const User = require("../models/user");
const helperController = require("./helperController");

exports.getAddMedicine = async (req, res, next) => {
  const userId = req.session.userId;

  // if (!userId) return res.redirect("/user/dashboard");

  res.render("user/add_Medicine", {
    pageTitle: "Add Medicine",
    currentPage: "add_Medicine",
    userId,
  });
};

exports.postDashboard = async (req, res, next) => {
  const userId = req.session.userId;
  const securityKey = req.session.securityKey;

  let { medicineName, totalDoses, scheduleTime } = req.body;
  console.log("type of totaldoses is :....:=> ",typeof(totalDoses));

  try {

    let existingMedicine;

  if(securityKey) {
    existingMedicine = await Medicine.findMedicineByKey(userId,medicineName,securityKey);
  } else {
    existingMedicine = await Medicine.findMedicine(userId, medicineName);
  }
    // existingMedicine = await Medicine.findMedicine(userId, medicineName, securityKey);

    if (existingMedicine) {
      return res.render("user/add_Medicine", {
        pageTitle: "Add Medicine",
        currentPage: "add_Medicine",
        errorMessage: "Medicine is already added.",
        userId,
      });
    }

    const remainingDosage = totalDoses;
    let newMedicine;

    if(securityKey) {
      newMedicine = new Medicine(
        userId,
        medicineName,
        totalDoses,
        scheduleTime,
        remainingDosage,
        securityKey,
        
      )
    } else {
      newMedicine = new Medicine(
        userId,
        medicineName,
        totalDoses,
        scheduleTime,
        remainingDosage,
      );
    }
  
    const user = await User.findUserById(userId);

    if (!user) {
      return res.redirect("/login");
    }

    await newMedicine.addMedicine();

    const redirectUrl = await helperController.redirectUrl(req, user);
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error in postDashboard:", error);
    res.render("user/add_Medicine", {
      pageTitle: "Add Medicine",
      currentPage: "add_Medicine",
      errorMessage: "Something went wrong.",
      userId,
    });
  }
};

exports.editMedicine = async (req, res, next) => {
  const userId = req.session.userId;
  const securityKey = req.session.securityKey;

  if (!userId) return res.redirect("/user/dashboard");
  let allMedicines;

  if(securityKey) {
    allMedicines = await Medicine.getAllMedicinesByKey(userId,securityKey);
  } else {
    allMedicines = await Medicine.getAllMedicinesById(userId);
  }

  res.render("user/edit_Medicine", {
    pageTitle: "edit_Medicine",
    currentPage: "edit_Medicine",
    allMedicines,
    userId,
  });
};

exports.deleteMedicine = async (req, res) => {
  const { id } = req.params;

  try {
    await Medicine.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}


