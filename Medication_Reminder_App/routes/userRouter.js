const express = require("express");

const {
  getAddMedicine
} = require("../controllers/dashboardController");

const router = express.Router();

router.get('/user/add-medicine', getAddMedicine);


module.exports = router;