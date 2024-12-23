const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/appRoutes');
const userRauter = require('./routes/userRouter')
const rootDir = require('./utils/pathUtils');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const {mongoConnect} = require('./utils/databaseUtils');

require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static('public'));

app.set('view engine', 'ejs');    // for use JS in html
app.set('views', 'views');    // set the proper path of 

app.use(express.static(path.join(rootDir,"public")));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Routes
app.use(authRoutes);
app.use(userRauter);

const PORT = 3000;

// Start the server
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
