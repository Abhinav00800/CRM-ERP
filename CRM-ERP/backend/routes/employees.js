const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// @route   GET /api/employees
// @desc    Get all employees
// @access  Public (or Protected if using auth middleware)
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees
    });
  } catch (err) {
    console.error('❌ Error fetching employees:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employees'
    });
  }
});

// @route   POST /api/employees
// @desc    Add a new employee
// @access  Public (or Protected if using auth middleware)
router.post('/', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: savedEmployee
    });
  } catch (err) {
    console.error('❌ Error creating employee:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create employee',
      error: err.message
    });
  }
});

module.exports = router;
