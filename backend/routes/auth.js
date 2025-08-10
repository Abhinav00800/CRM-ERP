const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/signin
authRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  // console.log(password)

  try {
    // Find user by email
    const user = await User.findOne({email});
    // console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }
 
    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // console.log("password mathced")

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: '1d' } // token expires in 1 day
    );

    // Send response with token
    res.json({
      message: 'Sign-in successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = authRouter;
