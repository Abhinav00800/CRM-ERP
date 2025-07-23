 const express = require('express');
const router = express.Router();
const Finance = require('../models/Finance');

// @route   GET /api/finance
// @desc    Get all finance records
// @access  Public (or Protected if using auth middleware)
router.get('/', async (req, res) => {
  try {
    const records = await Finance.find();
    res.status(200).json({
      success: true,
      message: 'Finance records fetched successfully',
      data: records
    });
  } catch (err) {
    console.error('❌ Error fetching finance records:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching finance records'
    });
  }
});

// @route   POST /api/finance
// @desc    Create a new finance record
// @access  Public (or Protected if using auth middleware)
router.post('/', async (req, res) => {
  try {
    const newRecord = new Finance(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      message: 'Finance record created successfully',
      data: savedRecord
    });
  } catch (err) {
    console.error('❌ Error creating finance record:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create finance record',
      error: err.message
    });
  }
});

module.exports = router;
