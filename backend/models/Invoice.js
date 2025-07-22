const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: [true, 'Invoice number is required'],
    unique: true,
    trim: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Client is required']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  type: {
    type: String,
    enum: ['Project', 'Maintenance', 'Consulting', 'Training', 'Other'],
    default: 'Project'
  },
  items: [{
    description: {
      type: String,
      required: [true, 'Item description is required']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0.01, 'Quantity must be positive']
    },
    rate: {
      type: Number,
      required: [true, 'Rate is required'],
      min: [0, 'Rate cannot be negative']
    },
    amount: {
      type: Number,
      required: true
    },
    taxRate: {
      type: Number,
      default: 18,
      min: [0, 'Tax rate cannot be negative'],
      max: [100, 'Tax rate cannot exceed 100%']
    }
  }],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  taxAmount: {
    type: Number,
    required: true,
    min: [0, 'Tax amount cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR']
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required'],
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  status: {
    type: String,
    enum: ['Draft', 'Sent', 'Paid', 'Partially Paid', 'Overdue', 'Cancelled'],
    default: 'Draft'
  },
  paymentTerms: {
    type: String,
    enum: ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Due on Receipt', 'Custom'],
    default: 'Net 30'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  terms: {
    type: String,
    maxlength: [1000, 'Terms cannot exceed 1000 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sentAt: Date,
  paidAt: Date,
  paidAmount: {
    type: Number,
    default: 0,
    min: [0, 'Paid amount cannot be negative']
  },
  paymentMethod: {
    type: String,
    enum: ['Bank Transfer', 'UPI', 'Cash', 'Cheque', 'Card', 'Other']
  },
  attachments: [{
    name: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Virtual for balance amount
invoiceSchema.virtual('balanceAmount').get(function() {
  return this.totalAmount - this.paidAmount;
});

// Virtual for payment status
invoiceSchema.virtual('paymentStatus').get(function() {
  if (this.paidAmount === 0) return 'Unpaid';
  if (this.paidAmount >= this.totalAmount) return 'Paid';
  return 'Partially Paid';
});

// Pre-save middleware to calculate totals
invoiceSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((sum, item) => sum + item.amount, 0);
  this.taxAmount = this.items.reduce((sum, item) => sum + (item.amount * item.taxRate / 100), 0);
  this.totalAmount = this.subtotal + this.taxAmount;
  next();
});

// Index for faster queries
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ client: 1 });
invoiceSchema.index({ project: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ issueDate: 1 });

// Ensure virtual fields are serialized
invoiceSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
