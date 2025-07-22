const Project = require('../../models/Project/Project');
const User = require('../../models/User/User');
const Client = require('../../models/Client/Client');
const { uploadToCloudinary } = require('../../utils/fileUpload');

// Get all projects with filtering, sorting, and pagination
exports.getAllProjects = async (req, res) => {
  try {
    const { search, status, manager, sortBy, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      query.status = status;
    }
    
    if (manager) {
      query.manager = manager;
    }
    
    const sortOptions = {};
    if (sortBy) {
      if (sortBy === 'deadline') {
        sortOptions.endDate = 1;
      } else if (sortBy === 'status') {
        sortOptions.status = 1;
      } else if (sortBy === 'name') {
        sortOptions.name = 1;
      }
    }
    
    const projects = await Project.find(query)
      .populate('client', 'name email phone')
      .populate('manager', 'firstName lastName email')
      .populate('teamMembers', 'firstName lastName email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const count = await Project.countDocuments(query);
    
    res.json({
      projects,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email phone')
      .populate('manager', 'firstName lastName email')
      .populate('teamMembers', 'firstName lastName email')
      .populate('expenses')
      .populate('income');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, client, manager, teamMembers, startDate, endDate, budget } = req.body;
    
    const project = new Project({
      name,
      description,
      client,
      manager,
      teamMembers: teamMembers || [],
      startDate,
      endDate,
      budget,
      createdBy: req.user.id
    });
    
    // Add to audit log
    project.auditLog.push({
      action: 'Project Created',
      performedBy: req.user.id,
      details: req.body
    });
    
    const savedProject = await project.save();
    
    // Notify assigned manager
    await notifyUser(manager, `You have been assigned as manager for project: ${name}`);
    
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const oldManager = project.manager;
    const oldStatus = project.status;
    
    // Update fields
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.client = req.body.client || project.client;
    project.manager = req.body.manager || project.manager;
    project.teamMembers = req.body.teamMembers || project.teamMembers;
    project.startDate = req.body.startDate || project.startDate;
    project.endDate = req.body.endDate || project.endDate;
    project.budget = req.body.budget || project.budget;
    project.status = req.body.status || project.status;
    project.updatedBy = req.user.id;
    
    // Check if manager changed
    if (req.body.manager && req.body.manager.toString() !== oldManager.toString()) {
      project.auditLog.push({
        action: 'Manager Changed',
        performedBy: req.user.id,
        details: {
          from: oldManager,
          to: req.body.manager
        }
      });
      
      // Notify new manager
      await notifyUser(req.body.manager, `You have been assigned as manager for project: ${project.name}`);
    }
    
    // Check if status changed
    if (req.body.status && req.body.status !== oldStatus) {
      project.auditLog.push({
        action: 'Status Changed',
        performedBy: req.user.id,
        details: {
          from: oldStatus,
          to: req.body.status
        }
      });
    }
    
    // General update log
    project.auditLog.push({
      action: 'Project Updated',
      performedBy: req.user.id,
      details: req.body
    });
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add milestone to project
exports.addMilestone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const milestone = {
      name: req.body.name,
      dueDate: req.body.dueDate,
      completed: false
    };
    
    project.milestones.push(milestone);
    
    project.auditLog.push({
      action: 'Milestone Added',
      performedBy: req.user.id,
      details: milestone
    });
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update milestone status
exports.updateMilestone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    const milestone = project.milestones.id(req.params.milestoneId);
    
    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found' });
    }
    
    const oldStatus = milestone.completed;
    milestone.completed = req.body.completed;
    
    if (req.body.completed && !oldStatus) {
      milestone.completedDate = new Date();
    } else if (!req.body.completed && oldStatus) {
      milestone.completedDate = undefined;
    }
    
    project.auditLog.push({
      action: 'Milestone Updated',
      performedBy: req.user.id,
      details: {
        milestone: milestone.name,
        completed: milestone.completed
      }
    });
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Upload document to project
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Upload file to cloud storage
    const uploadResult = await uploadToCloudinary(req.file);
    
    const document = {
      name: req.body.name || req.file.originalname,
      url: uploadResult.secure_url,
      uploadedBy: req.user.id
    };
    
    project.documents.push(document);
    
    project.auditLog.push({
      action: 'Document Uploaded',
      performedBy: req.user.id,
      details: document
    });
    
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Helper function to notify users
async function notifyUser(userId, message) {
  // Implementation would depend on your notification system
  // This could be email, in-app notification, etc.
  console.log(`Notifying user ${userId}: ${message}`);
}