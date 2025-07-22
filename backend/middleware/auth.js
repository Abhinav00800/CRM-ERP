const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User/User');

// Protect routes - user must be authenticated
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookie
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Make sure token exists
    if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new ErrorResponse('The user belonging to this token no longer exists', 401));
    }

    // Check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(new ErrorResponse('User recently changed password. Please log in again', 401));
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Verify user ownership or admin rights
const verifyOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params.id);

      if (!resource) {
        return next(new ErrorResponse('Resource not found', 404));
      }

      // Check if user is admin or resource owner
      if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
          new ErrorResponse('Not authorized to access this resource', 403)
        );
      }

      req.resource = resource;
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  verifyOwnership
};