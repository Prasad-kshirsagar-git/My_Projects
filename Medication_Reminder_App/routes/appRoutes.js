const express = require('express');
const { authenticateUser } = require("../middlewares/authenticateuser");
const {
  getLoginPage,
  getSignupPage,
  postLoginPage,
  postSignupPage,
  postLogOut,
} = require('../controllers/loginSignUpController');


// Check if express is defined
if (!express || typeof express.Router !== 'function') {
  throw new Error("Express is not defined or not imported correctly in appRoutes.js");
}

const router = express.Router();

// Define routes
router.get("/", getLoginPage);
router.get("/login", getLoginPage);
router.get("/signup", getSignupPage);
router.post("/login", postLoginPage);
router.post("/signUp", postSignupPage);
router.post('/api/logout', postLogOut);

router.get("/user/dashboard",authenticateUser ,(req, res) => {
  // const { user, notifications, reminders } = req.query;
  const userId = req.session.userId;

  if (!userId) {
    console.log("User not authenticated");
    return res.redirect("/login");
  }

  // Check if session data exists
  if (req.session.redirectData) {
    const { user, notifications, medicineHistory } = req.session.redirectData;

    // Use the data as needed (e.g., render a page or return JSON)
    res.render("user/dashboard", {
      pageTitle: "Dashboard",
      currentPage: "dashboard",
      userName: user.userName,
      notifications,
      medicineHistory,
      userId,
    });
  } else {
    res.render("user/dashboard", {
      pageTitle: "Dashboard",
      currentPage: "dashboard",
      userName: "Guest",
      notifications: "No notifications available",
      medicineHistory: [],
      userId,
    });
  }
});


module.exports = router;
