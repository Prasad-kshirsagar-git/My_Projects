const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dell@123',
  database: 'appusers',
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected!');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
