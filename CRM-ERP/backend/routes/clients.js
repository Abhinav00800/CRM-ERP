const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const authenticate = require('../middleware/authenticate');

// Get all clients
router.get('/', authenticate, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({ success: true, message: 'Clients fetched successfully', data: { clients } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get a single client by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client fetched successfully', data: { client } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Create a new client
router.post('/', authenticate, async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json({ success: true, message: 'Client created successfully', data: { client } });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Client creation failed', error: error.message });
  }
});

// Update a client
router.put('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client updated successfully', data: { client } });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Client update failed', error: error.message });
  }
});

// Delete a client
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
