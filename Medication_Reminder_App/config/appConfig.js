const jwt = require('jsonwebtoken');
const path = require('path');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = path.dirname(require.main.filename);