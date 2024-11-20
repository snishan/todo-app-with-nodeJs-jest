const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
};

module.exports = { signToken };
