import React from 'react';

const PaymentSummary = () => {
  const paymentInfo = {
    totalInvoiced: 40000,
    paid: 30000,
    pending: 10000,
    dueDate: '20 June 2025',
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">💰 Payment Summary</h2>
      <div className="space-y-2 text-gray-700">
        <p>Total Invoiced: ₹{paymentInfo.totalInvoiced}</p>
        <p>Paid: ₹{paymentInfo.paid}</p>
        <p>Pending: ₹{paymentInfo.pending}</p>
        <p>Next Due Date: {paymentInfo.dueDate}</p>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Download Invoice
      </button>
    </div>
  );
};

export default PaymentSummary;
