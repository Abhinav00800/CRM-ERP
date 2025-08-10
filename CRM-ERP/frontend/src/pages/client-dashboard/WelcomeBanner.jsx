// ✅ FILE: WelcomeBanner.jsx
import React from 'react';

const WelcomeBanner = () => {
  const clientName = 'to Your Client Dashboard';
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Welcome, {clientName}! 👋
      </h1>
      <p className="text-gray-600">Today is {currentDate}</p>
    </div>
  );
};

export default WelcomeBanner;
