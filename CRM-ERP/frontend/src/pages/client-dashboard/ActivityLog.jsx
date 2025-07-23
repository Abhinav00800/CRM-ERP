import React from 'react';

const ActivityLog = () => {
  const logs = [
    {
      date: '15 June 2025',
      activity: 'Invoice #2345 generated',
    },
    {
      date: '14 June 2025',
      activity: 'Project “CRM Module” marked as completed',
    },
    {
      date: '12 June 2025',
      activity: 'Support query resolved: Email integration issue',
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">📋 Recent Activity Log</h2>
      <ul className="space-y-3 text-gray-700">
        {logs.map((log, index) => (
          <li key={index} className="border-b pb-2">
            <p className="text-sm">{log.date}</p>
            <p className="font-medium">{log.activity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
