const jwt = require('jsonwebtoken');

// Secret key for signing JWTs (use a secure and unique key )
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

/**
 * Generates a JWT token for a user.
 * @param {Object} payload - The data to include in the JWT token.
 * @returns {string} - The signed JWT token.
 */
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {Object|null} - The decoded token if valid, or null if invalid.
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.log('Token verification failed:', err.message); // Added logging
        return null; // Invalid token
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
