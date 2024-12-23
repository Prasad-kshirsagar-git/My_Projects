const express = require("express");

const {
  getLoginPage,
  getSignupPage,
  postLoginPage,
  postSignupPage,
  authenticateToken,
  postDashboard
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

router.get("/user/dashboard", (req, res) => {
  const { user, adherenceSummary, notifications, reminders } = req.query;

  // Log the query parameters for debugging
  console.log("Query Parameters Received:", req.query);

  // Handle missing query parameters
  // if (!user || !adherenceSummary || !notifications || !reminders) {
  //   console.error("Missing query parameters");
  //   return res.redirect("/login");
  // }

  try {
    // Parse the serialized data
    const parsedUser = JSON.parse(user);
    const parsedReminders = JSON.parse(reminders);

    res.render("user/dashboard", {
      pageTitle: "Dashboard",
      currentPage: "dashboard",
      userName: parsedUser.userName,
      reminders: parsedReminders,
      adherenceSummary,
      notifications,
    });
  } 
  catch (err) {
    console.error("Error parsing query parameters:", err);
    return res.redirect("/login");
  }
});

router.post("/user/dashboard", postDashboard)

module.exports = router;
