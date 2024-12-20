const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const User = require('../models/User');
const { generateToken } = require("../utils/jwtUtils");

// Login controller
exports.getLoginPage = async (req, res, next) => {
  res.render("login", {
    pageTitle: "login Page",
    currentPage: "login",
  });
};

// Signup controller
exports.getSignupPage = async (req, res, next) => {
  res.render("signup", {
    pageTitle: "signup Page",
    currentPage: "signup",
  });
};

exports.postLoginPage = async (req, res, next) => {
  const { email, password } = req.body;

  const strPassword = password.toString();
  // const hashedPassword = bcrypt.hash(strPassword, 10);

  // console.log(typeof(hashedPassword));

  const user = new User(email, strPassword);

  user.matchAuthentication(email, strPassword).then((user) => {

    if(user) {

      console.log("User Find :-> ",user)
      // // Generate a JWT token
      // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: "1h",
      // });

      // console.log("userToken: ", token);
      // // res.json({ token });

      res.render("dashboard", {
        pageTitle: "dashboard Page",
        currentPage: "dashboard",
      });
    }  
  }).catch(error => {
    console.log("Invalide Email or Password", error);
  }).finally(() => {
    res.redirect("/login");
  })
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
        const strPassword = password.toString();
        // const hashedPassword = bcrypt.hash(strPassword, 10);

        const user = new User(userName, number, email, strPassword);
        user.saveUser().then(() => {
          console.log("Creating Account Successfully");
          res.render("login", {
            pageTitle: "login Page",
            currentPage: "login",
          });
        });
      }
    });
  }
};

// // Middleware to verify JWT token
// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

//   if (!token) return res.status(401).send('Access denied');

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send('Invalid token');
//     req.user = user;  // Attach user info to request object
//     next();
//   });
// }

// // Example of a protected route
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.send(`Hello, user ${req.user.userId}`);
// });
