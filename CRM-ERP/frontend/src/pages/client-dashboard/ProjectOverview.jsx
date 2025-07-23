import React from 'react';

const ProjectOverview = () => {
  const projects = [
    {
      name: 'Website Redesign',
      status: 'In Progress',
      start: '01 June 2025',
      due: '20 June 2025',
    },
    {
      name: 'CRM Module',
      status: 'Completed',
      start: '10 May 2025',
      due: '30 May 2025',
    },
  ];

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Project Overview</h2>
      <ul className="space-y-4">
        {projects.map((project, idx) => (
          <li key={idx} className="border p-4 rounded-md hover:shadow">
            <h3 className="text-lg font-bold">{project.name}</h3>
            <p>Status: <span className="font-medium">{project.status}</span></p>
            <p>Start: {project.start} | Due: {project.due}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectOverview;
