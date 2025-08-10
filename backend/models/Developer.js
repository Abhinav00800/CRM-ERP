// models/Developer.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const developerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String }],               
  experienceYears: { type: Number, default: 0 },
  currentProject: { type: Schema.Types.ObjectId, ref: 'Project' },  
  githubProfile: { type: String },      
}, {
  timestamps: true,
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
