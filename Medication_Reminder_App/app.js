const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const rootDir = require('./utils/pathUtils');

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

// Routes
app.use(authRoutes);

const PORT = 3000;

// Start the server
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
