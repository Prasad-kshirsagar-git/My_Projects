require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { mongoConnect } = require("./config/db");
const appRoutes = require('./routes/appRoutes');
const userRouter = require("./routes/userRouter");
const medicineRoutes = require("./routes/medicineRoutes");
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require("./middlewares/errorHandler");

// Check if express is defined
if (!express || typeof express.Router !== 'function') {
  throw new Error("Express is not defined or not imported correctly in app.js");
}

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
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
app.use(appRoutes);
app.use(userRouter);
app.use("/admin", adminRoutes);
app.use("/medicine", medicineRoutes);

// Error handling middleware
app.use(errorHandler);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});


const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;

// Use the MongoDB connection string from the .env file
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${process.env.APP_HOST}:${PORT}`);
  });
});
