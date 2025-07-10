import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, onClick, onEdit, onUpload }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'On Hold':
        return 'bg-yellow-200 text-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        
        {project.client && (
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Client:</span> {project.client.name}
          </p>
        )}
        
        {project.manager && (
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Manager:</span> {project.manager.firstName} {project.manager.lastName}
          </p>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Start:</span> {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">End:</span> {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>
          <p className="text-lg font-bold text-blue-600">
            ${project.budget.toLocaleString()}
          </p>
        </div>
        
        <div className="flex justify-between space-x-2">
          <button
            onClick={onClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded transition"
          >
            View Details
          </button>
          <button
            onClick={onEdit}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-4 rounded transition"
          >
            Edit
          </button>
          <button
            onClick={onUpload}
            className="bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded transition"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;