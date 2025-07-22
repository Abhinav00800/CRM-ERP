const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'] 
  },
  password: { 
    type: String, 
    required: true,
    select: false 
  },
  role: {
    type: String,
    enum: ['admin', 'projectManager', 'developer', 'client'],
    default: 'developer',
    required: true
  },
  department: {
    type: String,
    enum: ['Development', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'],
    required: function() {
      return this.role !== 'client';
    }
  },
  position: {
    type: String,
    required: function() {
      return this.role !== 'client';
    }
  },
  salary: {
    type: Number,
    required: function() {
      return this.role !== 'client';
    }
  },
  hireDate: {
    type: Date,
    default: Date.now,
    required: function() {
      return this.role !== 'client';
    }
  },
  skills: [{
    type: String
  }],
  profilePicture: {
    type: String,
    default: 'default-profile.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are included when converting to JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);

// Add this method to your User model (models/User.js)
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};