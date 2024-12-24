const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const medicine = require("../models/medicine");
const helperController = require("../controllers/helperController")

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Login controller
exports.getLoginPage = async (req, res, next) => {
  res.render("login", {
    pageTitle: "login Page",
    currentPage: "login",
  });
};

// Signup controller
exports.getSignupPage = (req, res, next) => {
  res.render("signup", {
    pageTitle: "signup Page",
    currentPage: "signup",
  });
};

exports.postLoginPage = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    let user;
    try {
      user = await User.findUserByEmail(email);
    } catch (err) {
      console.error("Error finding user:", err);
      return res.render("login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Something went wrong. Please try again.",
      });
    }

    if (!user) {
      console.log("User Not Found");
      return res.render("login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Invalid email or password",
      });
    }

    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      console.error("Error comparing passwords:", err);
      return res.render("login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Something went wrong. Please try again.",
      });
    }

    if (!isMatch) {
      console.log("Invalid email or password");
      return res.render("login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Invalid email or password",
      });
    }

    req.session.userId = user._id;

    const redirectUrl = await helperController.redirectUrl(user);
    console.log("Redirecting to:", redirectUrl);
    res.redirect(redirectUrl);
  } catch (err) {
    console.error("Error during login:", err);
    return res.render("login", {
      pageTitle: "Login Page",
      currentPage: "login",
      errorMessage: "Something went wrong. Please try again.",
    });
  }
};

exports.authenticateUser = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect("/login");
};

exports.postSignupPage = (req, res, next) => {
  const { userName, number, email, password, confirmPassword } = req.body;

  console.log("SignUp Page Detals : ", req.body.password);
  console.log("SignUp Page Detals : ", req.body.confirmPassword);

  if (password !== confirmPassword) {
    console.log("Password Does Not Match");
    res.redirect("/signup");
  } else {
    User.findUserByEmail(email).then((user) => {
      if (user) {
        console.log("Email is already registered.");
        res.redirect("/signup");
      } else {
        bcrypt
          .hash(password, 10) // Ensure `password` is a valid string
          .then((hashedPassword) => {
            // Save user with hashed password to the database
            console.log("hashed password :=> ", hashedPassword);
            const user = new User(userName, number, email, hashedPassword);
            return user.saveUser();
          })
          .then(() => {
            console.log("User registered successfully");
            return res.render("login", {
              pageTitle: "login Page",
              currentPage: "login",
              errorMessage: "Your Registration successfull",
            });
          })
          .catch((err) => {
            console.error("Error during registration:", err);
            return res.redirect("/signup", {
              pageTitle: "signup Page",
              currentPage: "signup",
              errorMessage: "Something went wrong. Please try again.",
            });
          });
      }
    });
  }
};

