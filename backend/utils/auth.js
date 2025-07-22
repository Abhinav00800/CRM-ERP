const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Verify JWT Token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {

  }
};

// Generate random token (for password reset)
const generateRandomToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Hash token (for password reset)
const hashToken = (token) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
};

// Get token from request
const getTokenFromRequest = (req) => {
  let token;
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  
  if (!token) {
    
  }
  
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  generateRandomToken,
  hashToken,
  getTokenFromRequest
};