const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  alternatePhone: {
    type: String,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    enum: ['Technology', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Finance', 'Real Estate', 'Other'],
    default: 'Other'
  },
  source: {
    type: String,
    enum: ['Website', 'Referral', 'Social Media', 'Cold Call', 'Advertisement', 'Partner', 'Other'],
    default: 'Website'
  },
  status: {
    type: String,
    enum: ['Lead', 'Prospect', 'Active', 'Inactive', 'Churned'],
    default: 'Lead'
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' },
    sameAsAddress: { type: Boolean, default: true }
  },
  gstNumber: {
    type: String,
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please enter a valid GST number']
  },
  panNumber: {
    type: String,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client must be assigned to a team member']
  },
  leadValue: {
    type: Number,
    min: [0, 'Lead value cannot be negative'],
    default: 0
  },
  expectedCloseDate: {
    type: Date
  },
  notes: [{
    content: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['General', 'Meeting', 'Call', 'Email', 'Follow-up'],
      default: 'General'
    }
  }],
  communications: [{
    type: {
      type: String,
      enum: ['Email', 'Call', 'Meeting', 'WhatsApp', 'SMS'],
      required: true
    },
    subject: String,
    content: String,
    scheduledAt: Date,
    completedAt: Date,
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Missed', 'Cancelled'],
      default: 'Scheduled'
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
      enum: ['Contract', 'Proposal', 'Invoice', 'Agreement', 'Other'],
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
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastContactDate: {
    type: Date,
    default: Date.now
  },
  nextFollowUpDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
clientSchema.index({ email: 1 });
clientSchema.index({ phone: 1 });
clientSchema.index({ company: 1 });
clientSchema.index({ assignedTo: 1 });
clientSchema.index({ status: 1 });

module.exports = mongoose.model('Client', clientSchema);
