const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  teamLeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamLead',
    required: true
  },
  developers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer'
    }
  ],
  teamId: {  // <-- Add this
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  paymentSummary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentSummary' 
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
