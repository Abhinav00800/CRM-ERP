const mongoose = require('mongoose');

const paymentSummarySchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client', 
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  totalInvoiced: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    required: true,
  },
  pending: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const PaymentSummary = mongoose.model('PaymentSummary', paymentSummarySchema);

module.exports = PaymentSummary;
