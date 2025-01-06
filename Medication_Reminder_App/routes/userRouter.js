const express = require('express');
const {
  getAddMedicine,
  postDashboard,
  editMedicine,
} = require('../controllers/dashboardController');
const { authenticateUser } = require("../middlewares/authenticateuser");

const router = express.Router();

// Secure routes with `authenticateUser`
router.get("/user/add-medicine", authenticateUser, getAddMedicine);
router.get("/user/edit-medicine", authenticateUser, editMedicine);
router.post("/user/dashboard", authenticateUser, postDashboard);

module.exports = router;
