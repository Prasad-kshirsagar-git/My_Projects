const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

exports.postLoginPage = (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  User.findUserByEmail(email)
    .then((user) => {
      if (!user) {
        console.log("User Not Found :->");
        return res.render("login", {
          pageTitle: "Login Page",
          currentPage: "login",
          errorMessage: "Invalid email or password",
          email: "",
          password: "",
        });
      }

      // Compare the password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            console.log("Invalid email or password");
            return res.render("login", {
              pageTitle: "Login Page",
              currentPage: "login",
              errorMessage: "Invalid email or password",
              email: "",
              password: "",
            });
          }

          // Generate JWT
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          console.log("User authenticated successfully");

          const reminders = [
            { name: "Aspirin 100mg", time: "Today at 8:00 PM" },
            { name: "Metformin 500mg", time: "Tomorrow at 7:00 AM" },
          ];
          const adherenceSummary = "4/5 doses taken today.";
          const notifications =
            "You have 3 doses left of Metformin. Refill now.";

          // Send token in response
          res.cookie("authToken", token, { httpOnly: true, secure: true }); // Store token in a cookie (optional)
          return res.render("user/dashboard", {
            pageTitle: "Dashboard Page",
            currentPage: "dashboard",

            userName: user.userName,
            reminders,  adherenceSummary, notifications});
        })
        .catch((err) => {
          console.error("Password comparison error: ", err);
          return res.render("login", {
            pageTitle: "Login Page",
            currentPage: "login",
            errorMessage: "Something went wrong. Please try again.",
            email: "",
            password: "",
          });
        });
    })
    .catch((err) => {
      console.error("Error finding user: ", err);
      return res.render("login", {
        pageTitle: "Login Page",
        currentPage: "login",
        errorMessage: "Something went wrong. Please try again.",
        email: "",
        password: "",
      });
    });
};

exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken; // Assuming the token is stored in a cookie

  if (!token) {
    console.error("No token found");
    return res.render("dashboard");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Attach user data to the request
    next();
  } catch (err) {
    console.error("Invalid token: ", err);
    res.redirect("/login");
  }
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
            return res.redirect("login", {
              pageTitle: "signup Page",
              currentPage: "signup",
              errorMessage: "Your Registration successfull",
            });
          })
          .catch((err) => {
            console.error("Error during registration:", err);
            return res.render("signup", {
              pageTitle: "signup Page",
              currentPage: "signup",
              errorMessage: "Something went wrong. Please try again.",
            });
          });
      }
    });
  }
};