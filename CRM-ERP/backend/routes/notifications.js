const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// @route   GET /api/notifications
// @desc    Get all notifications
// @access  Public (or Protected if using auth middleware)
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({
      success: true,
      message: 'Notifications fetched successfully',
      data: notifications
    });
  } catch (err) {
    console.error('❌ Error fetching notifications:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
});

// @route   POST /api/notifications
// @desc    Create a new notification
// @access  Public (or Protected if using auth middleware)
router.post('/', async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: savedNotification
    });
  } catch (err) {
    console.error('❌ Error creating notification:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create notification',
      error: err.message
    });
  }
});

module.exports = router;
