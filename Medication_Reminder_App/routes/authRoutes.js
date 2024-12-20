const express = require('express');
const {getLoginPage, getSignupPage, postLoginPage, postSignupPage} = require('../controllers/authController');

const router = express.Router();

router.get('/', getLoginPage);
router.get('/signup', getSignupPage);
router.get('/login', getLoginPage);

router.post('/login', postLoginPage);
router.post('/signup', postSignupPage);

module.exports = router;