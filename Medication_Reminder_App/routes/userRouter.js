const express = require("express");

const {
  getAddMedicine,
  postDashboard
} = require("../controllers/dashboardController");

const router = express.Router();

router.get('/user/add-medicine', getAddMedicine);
router.post("/user/dashboard", postDashboard);


module.exports = router;