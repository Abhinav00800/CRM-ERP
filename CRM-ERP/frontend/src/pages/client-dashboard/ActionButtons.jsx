import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate('/client-form'); // Page where the form is shown
  };

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🛠 Client Actions</h2>
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <button
          onClick={handleAction}
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Raise a Query
        </button>
        <button
          onClick={handleAction}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
