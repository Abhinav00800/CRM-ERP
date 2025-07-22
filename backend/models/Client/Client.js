const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'] 
  },
  phone: { 
    type: String,
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  company: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  industry: {
    type: String,
    enum: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Other']
  },
  contactPerson: {
    name: String,
    position: String
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  taxId: {
    type: String,
    select: false
  },
  paymentTerms: {
    type: String,
    enum: ['Net 15', 'Net 30', 'Net 60', 'Due on Receipt'],
    default: 'Net 30'
  },
  notes: {
    type: String
  },
  assignedAccountManager: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Lead', 'Prospect'],
    default: 'Active'
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  documents: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Indexes for faster querying
clientSchema.index({ name: 1 });
clientSchema.index({ email: 1 }, { unique: true });
clientSchema.index({ company: 1 });
clientSchema.index({ status: 1 });

// Virtual for full address
clientSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

module.exports = mongoose.model('Client', clientSchema);