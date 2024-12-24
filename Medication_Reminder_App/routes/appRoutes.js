const express = require("express");

const {
  getLoginPage,
  getSignupPage,
  postLoginPage,
  postSignupPage,
  authenticateToken,
  postDashboard,
  authenticateUser
} = require("../controllers/loginSignUpController");

const router = express.Router();

// Route for login page (GET)
router.get("/", getLoginPage);
router.get("/login", getLoginPage);

// Route for signup page (GET)
router.get("/signup", getSignupPage);

// Route for login form submission (POST)
router.post("/login", postLoginPage);

// Route for signup form submission (POST)
router.post("/signUp", postSignupPage);

// Route for user dashboard (GET) with authentication middleware
// 

router.get("/user/dashboard",authenticateUser, (req, res) => {
  const { user, notifications, reminders } = req.query;

  const userId = req.session.userId;
  
  console.log("userId from /user/dashboard is :=> ",userId);
  // Log the query parameters for debugging
  console.log("Query Parameters Received:", req.query);

  if(!userId) {
    console.log("user not authenticat");
    return res.redirect('/login');
  }

  try {
    // Parse the serialized data
    const parsedUser = user ? JSON.parse(user) : {};
    const parsedReminders = reminders ? JSON.parse(decodeURIComponent(reminders)) : [];

    console.log("parsed User is :=> ", parsedUser);
    console.log("Reminders in appRoutes is :=> ", parsedReminders);

    res.render("user/dashboard", {
      pageTitle: "Dashboard",
      currentPage: "dashboard",
      userName: parsedUser.userName || "Unknown",
      reminders: parsedReminders,
      notifications: notifications || "No Notifications",
      userId,
    });
  } 
  catch (err) {
    console.error("Error parsing query parameters:", err);
    return res.redirect("/login");
  }
});

module.exports = router;
