const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project manager is required']
  },
  teamMembers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['Developer', 'Designer', 'Tester', 'DevOps', 'Analyst'],
      required: true
    },
    assignedDate: {
      type: Date,
      default: Date.now
    },
    hourlyRate: {
      type: Number,
      min: [0, 'Hourly rate cannot be negative']
    }
  }],
  projectType: {
    type: String,
    enum: ['Website Development', 'Mobile App', 'E-commerce', 'CRM/ERP', 'Digital Marketing', 'Maintenance', 'Consulting', 'Other'],
    required: [true, 'Project type is required']
  },
  technology: [{
    type: String,
    enum: ['React', 'Node.js', 'MongoDB', 'MySQL', 'PHP', 'Python', 'React Native', 'Flutter', 'WordPress', 'Shopify', 'Other']
  }],
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Testing', 'Deployment', 'Completed', 'On Hold', 'Cancelled'],
    default: 'Planning'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  actualStartDate: {
    type: Date
  },
  actualEndDate: {
    type: Date
  },
  budget: {
    estimated: {
      type: Number,
      required: [true, 'Estimated budget is required'],
      min: [0, 'Budget cannot be negative']
    },
    actual: {
      type: Number,
      min: [0, 'Actual budget cannot be negative'],
      default: 0
    }
  },
  milestones: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    dueDate: {
      type: Date,
      required: true
    },
    completedDate: Date,
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
      default: 'Pending'
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }],
  tasks: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Review', 'Done'],
      default: 'To Do'
    },
    estimatedHours: {
      type: Number,
      min: [0, 'Estimated hours cannot be negative']
    },
    actualHours: {
      type: Number,
      min: [0, 'Actual hours cannot be negative'],
      default: 0
    },
    dueDate: Date,
    completedDate: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  timeTracking: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    hours: {
      type: Number,
      required: true,
      min: [0.25, 'Minimum 15 minutes required'],
      max: [24, 'Cannot exceed 24 hours per day']
    },
    description: {
      type: String,
      required: true
    },
    task: {
      type: mongoose.Schema.Types.ObjectId
    },
    billable: {
      type: Boolean,
      default: true
    }
  }],
  documents: [{
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Requirement', 'Design', 'Contract', 'Invoice', 'Report', 'Other'],
      default: 'Other'
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    version: {
      type: Number,
      default: 1
    }
  }],
  communications: [{
    type: {
      type: String,
      enum: ['Email', 'Call', 'Meeting', 'Message'],
      required: true
    },
    subject: String,
    content: String,
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    scheduledAt: Date,
    completedAt: Date,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  completionPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Virtual for total hours worked
projectSchema.virtual('totalHours').get(function() {
  return this.timeTracking.reduce((total, entry) => total + entry.hours, 0);
});

// Virtual for billable hours
projectSchema.virtual('billableHours').get(function() {
  return this.timeTracking
    .filter(entry => entry.billable)
    .reduce((total, entry) => total + entry.hours, 0);
});

// Index for faster queries
projectSchema.index({ client: 1 });
projectSchema.index({ projectManager: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ startDate: 1, endDate: 1 });

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);
