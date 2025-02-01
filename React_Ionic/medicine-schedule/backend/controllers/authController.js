const db = require('../config/db');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    console.log('Received signup data:', { username, email, password }); // Log input data


    try {
        await db.query('INSERT INTO users (userName, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (user.length > 0) {
            res.status(200).json({ message: 'Login successful', user: user[0] });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};
