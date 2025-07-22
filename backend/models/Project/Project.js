const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  client: { 
    type: Schema.Types.ObjectId, 
    ref: 'Client',
    required: true 
  },
  manager: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  teamMembers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
    default: 'Not Started'
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  income: [{
    type: Schema.Types.ObjectId,
    ref: 'Income'
  }],
  milestones: [{
    name: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    completedDate: { type: Date }
  }],
  documents: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    uploadDate: { type: Date, default: Date.now }
  }],
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  updatedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  auditLog: [{
    action: { type: String, required: true },
    performedBy: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    timestamp: { type: Date, default: Date.now },
    details: { type: Object }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);