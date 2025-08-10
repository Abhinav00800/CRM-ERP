// models/TeamLead.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamLeadSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  avatar: { type: String },
  teamSize: { type: Number, default: 0 },
  projectsManaged: { type: Number, default: 0 },
  workload: { type: Number, min: 0, max: 100 },
}, {
  timestamps: true,
});

const TeamLead = mongoose.model('TeamLead', teamLeadSchema);

module.exports = TeamLead;
