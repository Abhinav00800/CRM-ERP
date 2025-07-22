const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Expense title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be positive']
  },
  category: {
    type: String,
    enum: [
      'Salaries & Wages',
      'Rent & Utilities',
      'Software Licenses',
      'Hardware & Equipment',
      'Internet & Communication',
      'Travel & Transportation',
      'Marketing & Advertisement',
      'Professional Services',
      'Office Supplies',
      'Training & Development',
      'Entertainment',
      'Insurance',
      'Bank Charges',
      'Legal & Compliance',
      'Maintenance & Repairs',
      'Other'
    ],
    required: [true, 'Category is required']
  },
  subcategory: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Expense date is required'],
    default: Date.now
  },
  vendor: {
    name: {
      type: String,
      trim: true
    },
    phone: String,
    email: String,
    gstNumber: String
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transfer', 'UPI', 'Card', 'Cheque', 'Other'],
    required: [true, 'Payment method is required']
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Paid'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  department: {
    type: String,
    enum: ['Development', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Admin', 'General']
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['Monthly', 'Quarterly', 'Yearly'],
    required: function() { return this.isRecurring; }
  },
  nextRecurringDate: {
    type: Date,
    required: function() { return this.isRecurring; }
  },
  taxDetails: {
    gstRate: {
      type: Number,
      min: 0,
      max: 28,
      default: 0
    },
    gstAmount: {
      type: Number,
      min: 0,
      default: 0
    },
    tdsRate: {
      type: Number,
      min: 0,
      max: 30,
      default: 0
    },
    tdsAmount: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  receipts: [{
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String,
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Virtual for total amount including tax
expenseSchema.virtual('totalAmount').get(function() {
  return this.amount + this.taxDetails.gstAmount - this.taxDetails.tdsAmount;
});

// Index for faster queries
expenseSchema.index({ date: -1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ project: 1 });
expenseSchema.index({ submittedBy: 1 });
expenseSchema.index({ approvalStatus: 1 });

// Ensure virtual fields are serialized
expenseSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Expense', expenseSchema);
