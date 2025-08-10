import React, { useEffect, useState } from "react";
import { ApiConnector } from "../../operation/ApiConnector";
import { endPoints } from "../../operation/Api";
import { useProject } from "../../context/ProjectContext";

const PaymentSummary = () => {
  const { selectedProject } = useProject();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedProject) return;

    const fetchPaymentSummary = async () => {
      setLoading(true);
      try {
        // console.log(selectedProject.clientId)
        const res = await ApiConnector({
          method: "get",
          url: `${endPoints.FINANCE_SUMMARY}?clientId=${selectedProject.clientId._id}&projectId=${selectedProject._id}`,
          query: {
            clientId: selectedProject.clientId._id,
            projectId: selectedProject._id
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setPaymentInfo(res.data);
      } catch (err) {
        setError("Failed to load payment summary");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentSummary();
  }, [selectedProject]);

  if (!selectedProject) {
    return <div className="bg-white p-6 rounded shadow-md">Select a project to see payment summary</div>;
  }

  if (loading) return <div className="bg-white p-6 rounded shadow-md">Loading payment info...</div>;
  if (error) return <div className="bg-white p-6 rounded shadow-md text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">💰 Payment Summary</h2>
      {paymentInfo ? (
        <div className="space-y-2 text-gray-700">
          <p>Total Invoiced: ₹{paymentInfo.totalInvoiced}</p>
          <p>Paid: ₹{paymentInfo.paid}</p>
          <p>Pending: ₹{paymentInfo.pending}</p>
          <p>Next Due Date: {new Date(paymentInfo.dueDate).toLocaleDateString('en-GB')}</p>
        </div>
      ) : (
        <p>No payment info found</p>
      )}
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Download Invoice
      </button>
    </div>
  );
};

export default PaymentSummary;
