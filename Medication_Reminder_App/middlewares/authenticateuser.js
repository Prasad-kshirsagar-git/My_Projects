exports.authenticateUser = (req, res, next) => {
  // Check if session exists (for session-based authentication)
  if (req.session && req.session.user) {
    return next(); // Proceed if session is valid
  }

  // Check for token presence (for token-based authentication)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // Handle invalid or expired tokens
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
  }
};