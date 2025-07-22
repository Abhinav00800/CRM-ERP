const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/Project/projectController');
const { authenticate, authorize } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// Get all projects
router.get('/', authenticate, projectController.getAllProjects);

// Get single project
router.get('/:id', authenticate, projectController.getProjectById);

// Create new project (Admin or Project Manager only)
router.post('/', authenticate, authorize(['admin', 'projectManager']), projectController.createProject);

// Update project (Admin or Project Manager only)
router.put('/:id', authenticate, authorize(['admin', 'projectManager']), projectController.updateProject);

// Add milestone (Admin or Project Manager only)
router.post('/:id/milestones', authenticate, authorize(['admin', 'projectManager']), projectController.addMilestone);

// Update milestone (Admin or Project Manager only)
router.put('/:id/milestones/:milestoneId', authenticate, authorize(['admin', 'projectManager']), projectController.updateMilestone);

// Upload document
router.post('/:id/documents', authenticate, upload.uploadSingle('file'), projectController.uploadDocument);

// Delete project (Admin only)
router.delete('/:id', authenticate, authorize(['admin']), projectController.deleteProject);

module.exports = router;