// Express route example
const express = require('express');
const clientRouter = express.Router();
const Client = require('../models/Client');

clientRouter.get('/', async (req, res) => {
  try {
    const clients = await Client.find()
      .populate('user', 'name email contact'); // populate user info if needed
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = clientRouter;
