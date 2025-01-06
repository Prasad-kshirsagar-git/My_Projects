const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");
const { authenticateUser } = require("../middlewares/authenticateuser");


// Secure routes with `authenticateUser`
router.delete("/delete/:id", authenticateUser, medicineController.deleteMedicineById);
router.post("/alarm/:id", authenticateUser, medicineController.setAlarm);
router.patch("/taken/:id", authenticateUser, medicineController.medicineTaken);

module.exports = router;
