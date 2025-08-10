// models/Admin.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Add any admin-specific fields here if needed, otherwise keep empty
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
