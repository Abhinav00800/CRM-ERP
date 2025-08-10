import React, { useEffect, useState } from 'react';
import { ApiConnector } from '../../operation/ApiConnector';
import { endPoints } from '../../operation/Api';
import { useProject } from '../../context/ProjectContext';

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString('en-GB');
};

const ProjectOverview = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSelectedProject } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ApiConnector({
          method: 'get',
          url: endPoints.CLIENT_PROJECT,
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="bg-white p-6 rounded shadow-md">Loading...</div>;
  if (error) return <div className="bg-white p-6 rounded shadow-md text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">📦 Project Overview</h2>
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, idx) => (
            <li
              key={project._id || idx}
              className="border p-4 rounded-md hover:shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>Status: <span className="font-medium">{project.status}</span></p>
              <p>
                Created: {formatDate(project.createdAt)} | Updated: {formatDate(project.updatedAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectOverview;
