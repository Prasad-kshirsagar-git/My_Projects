// for write JS into the html page (html with JS) we can use EJS(embeded javaScript)
// cmd :- npm install --save ejs

// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const storeRouter = require("./routes/storeRouter")
//const hostRouter = require("./routes/hostRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils")

const controller404 = require("./controllers/Error");

const db = require("./utils/databaseUtils");
const { Result } = require('postcss');
const { error } = require('console');
const {mongoConnect} = require('./utils/databaseUtils');

const app = express();

// app.use((req, res, next) => {
//   console.log(req.url, req.method);
//   next();
// });

app.set('view engine', 'ejs');    // for use JS in html
app.set('views', 'views');    // set the proper path of views folder
app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(rootDir,"public")));

app.use(controller404.get404);

const PORT = 3000;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
})
