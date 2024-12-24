const {ObjectId} = require('mongodb');
const Medicine = require("../models/medicine")
const helperController = require("../controllers/helperController")
const User = require("../models/user");

exports.getAddMedicine = (req, res, next) => {
  
  const userId = req.session.userId;

  console.log("user authenticate in /user/add_medicine route", userId);
  
  if(!userId) {
    console.log("user not authenticate in /user/add_medicine route")
    res.redirect('/user/dashboard');
  }

  console.log(`user id of user in addMedicine page is : ${userId}`);

  res.render("user/add_Medicine", {
    pageTitle: "Add Medicine",
    currentPage: "add_Medicine",
    userId
  });
}


exports.postDashboard = async (req, res, next) => {
  const userId = req.session.userId;
  const { medicineName, dosage, scheduleTime } = req.body;


  if (!ObjectId.isValid(userId)) {
    console.error("Invalid userId:", userId);
    return res.redirect("/login");
  }

  try {
    const existingMedicine = await Medicine.findMedicine(medicineName);
    if (existingMedicine) {
      return res.render("user/add_Medicine", {
        pageTitle: "Add Medicine",
        currentPage: "add_Medicine",
        errorMessage: "Medicine is already added.",
        userId,
      });
    }

    const newMedicine = new Medicine(medicineName, dosage, scheduleTime, "not_Taken");
    await newMedicine.addMedicine();

    const user = await User.findUserById(new ObjectId(userId));

    if (!user) {
      console.error("User not found for userId:", userId);
      return res.redirect("/login");
    }
    
    const redirectUrl = await helperController.redirectUrl(user);

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


