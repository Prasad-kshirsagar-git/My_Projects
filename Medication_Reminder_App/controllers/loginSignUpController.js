// const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const emailService = require("./emailService");

const helperController = require("../controllers/helperController");

const User = require('../models/user');

// Login Page Controller
exports.getLoginPage = async (req, res) => {
  res.render("auth/login", { pageTitle: "Login Page", currentPage: "login" });
};

// Signup Page Controller
exports.getSignupPage = async (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup Page",
    currentPage: "signup",
  });
};

// Login Handler
exports.postLoginPage = async (req, res, next) => {
  try {
    const { role, email, password , securityKey } = req.body;

    if (role === "Patient" && (!securityKey || securityKey.trim() === "")) {
      return res.render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Security key is required for Patient!",
      });
    }

    let user = await User.findUserByEmail(email);
    if (!user) {
      return res.render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Invalid email...!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Invalid Password....!",
      });
    }

    if(role === "Patient") {
     const Doctor = await User.findUserBySecurityKey(securityKey);
     if(!Doctor) {
      return res.render("auth/login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Invalid Security Key",
      });
     }
    }
    req.session.user = user;
    req.session.userId = user._id;
    if(securityKey) {
      req.session.securityKey = securityKey;
    } else {
      req.session.securityKey = user.securityKey;
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 

    res.cookie('token', token, { httpOnly: true }); 

    const redirectUrl = await helperController.redirectUrl(req, user);
    res.redirect(redirectUrl);
    
  } catch (err) {
    console.error("Error during login:", err);
    res.render("auth/login", {
      pageTitle: "Login Page",
      currentPage: "login",
      errorMessage: "Something went wrong. Please try again.",
    });
  }
};

exports.postSignupPage = async (req, res, next) => {
  const {role, userName, number, email, password, confirmPassword, securityKey } = req.body;

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
       return res.render("auth/signUp", { errorMessage: "Email is already registered." });
    }

    if (password !== confirmPassword) {
      return res.render("auth/signUp", { errorMessage: "Passwords do not match!" });
    }
  
    if (role === "Doctor" && (!securityKey || securityKey.trim() === "")) {
      return res.render("auth/signUp", { errorMessage: "Security key is required for Doctor!" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;

    console.log("securityKey from postSignUpPage is :=> ", securityKey);

    if(securityKey) {
      user = new User(role, userName, number, email, hashedPassword, securityKey);
    } else {
      user = new User(role, userName, number, email, hashedPassword);
    }

    // Create a token with a plain object payload
    const tokenPayload = { id: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' }); 

    res.cookie('token', token, { httpOnly: true });
    
    await user.saveUser();

    // send mail
    await emailService.sendRegistrationEmail(userName, email, password);

    res.render("auth/login", {
      pageTitle: "Login Page",
      currentPage: "login",
      errorMessage: "Your registration was successful",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.render("auth/signup", {
      pageTitle: "Signup Page",
      currentPage: "signup",
      errorMessage: "Something went wrong. Please try again.",
    });
  }
};

exports.postLogOut = (req, res) => {
  // Destroy session (if using session-based auth)
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Failed to destroy session:', err);
        return res.status(500).send('Logout failed.');
      }
      res.clearCookie('session_id'); // Clear session cookie
      res.clearCookie('token'); // Clear JWT cookie
      return res.redirect('/login'); // Redirect to login page
    });
  } else {
    res.clearCookie('token'); // Clear JWT cookie
    // If token-based auth, just redirect
    return res.redirect('/login');
  }
};
