const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length > 0) res.send({ success: true });
    else res.status(401).send({ success: false, message: 'Invalid credentials' });
  });
});

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true });
  });
});

module.exports = router;
