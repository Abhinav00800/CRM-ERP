 const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// @route   GET /api/reports
// @desc    Get all reports
// @access  Public (or Protected if using auth middleware)
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json({
      success: true,
      message: 'Reports fetched successfully',
      data: reports
    });
  } catch (err) {
    console.error('❌ Error fetching reports:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching reports'
    });
  }
});

// @route   POST /api/reports
// @desc    Create a new report
// @access  Public (or Protected if using auth middleware)
router.post('/', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: savedReport
    });
  } catch (err) {
    console.error('❌ Error creating report:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create report',
      error: err.message
    });
  }
});

module.exports = router;
