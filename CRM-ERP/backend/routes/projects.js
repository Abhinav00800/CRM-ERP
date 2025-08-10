const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public (or Protected if using auth middleware)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects
    });
  } catch (err) {
    console.error('❌ Error fetching projects:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching projects'
    });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Public (or Protected if using auth middleware)
router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: savedProject
    });
  } catch (err) {
    console.error('❌ Error creating project:', err);
    res.status(400).json({
      success: false,
      message: 'Failed to create project',
      error: err.message
    });
  }
});

module.exports = router;
