const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateUser } = require("../middlewares/authenticateuser");

const router = express.Router();

// Secure routes with `authenticateUser`
router.get("/admin_dashboard", authenticateUser, adminController.getAdminDashboard);
router.get("/all_User", authenticateUser, adminController.getAllUsers);
router.get("/user_log/:id", authenticateUser, adminController.getLogs);

module.exports = router;
