const express = require('express');
const {getLoginPage, getSignupPage, postLoginPage, postSignupPage, authenticateToken} = require('../controllers/loginSignUpController');

const router = express.Router();

router.get('/', getLoginPage);
router.get('/signup', getSignupPage);
router.get('/login', getLoginPage);

router.get("/dashboard", postLoginPage);

// router.get("user/dashboard", authenticateToken, (req, res) => {
//   res.render("dashboard", {
//     pageTitle: "Dashboard Page",
//     currentPage: "dashboard",
//     user: req.user,
//   });
// });

router.post('/login', postLoginPage);
router.post('/signup', postSignupPage);


module.exports = router;