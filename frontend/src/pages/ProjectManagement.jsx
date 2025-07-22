import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/Project/ProjectCard';
import SearchFilterSort from '../components/Project/SearchFilterSort';
import ModalForm from '../components/Project/ModalForm';
import DocumentUploader from '../components/Project/DocumentUploader';

// Using mock services for development
import { 
  fetchProjects, 
  createProject, 
  updateProject, 
  uploadDocument,
  fetchUsers,
  fetchClients 
} from '../services/Project/mockServices';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, usersData, clientsData] = await Promise.all([
          fetchProjects(),
          fetchUsers(),
          fetchClients()
        ]);
        
        setProjects(projectsData);
        setFilteredProjects(projectsData);
        setUsers(usersData);
        setClients(clientsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProjects(projects);
      return;
    }
    
    const filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.client && project.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredProjects(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = [...projects];
    
    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status);
    }
    
    if (filters.manager) {
      filtered = filtered.filter(project => 
        project.manager && project.manager._id === filters.manager
      );
    }
    
    setFilteredProjects(filtered);
  };

  const handleSort = (sortOption) => {
    let sorted = [...filteredProjects];
    
    switch (sortOption) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'deadline':
        sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
        break;
      case 'created':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    
    setFilteredProjects(sorted);
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects([...projects, newProject]);
      setFilteredProjects([...projects, newProject]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProject = async (projectId, projectData) => {
    try {
      const updatedProject = await updateProject(projectId, projectData);
      const updatedProjects = projects.map(p => 
        p._id === projectId ? updatedProject : p
      );
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUploadDocument = async (file) => {
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      await uploadDocument(selectedProject._id, formData);
      // Refresh project data
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);
      setIsUploadModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add New Project
          </button>
        </div>

        <SearchFilterSort
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          users={users}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={(project) => {
                setSelectedProject(project);
                setIsModalOpen(true);
              }}
              onUpload={(project) => {
                setSelectedProject(project);
                setIsUploadModalOpen(true);
              }}
            />
          ))}
        </div>

        {isModalOpen && (
          <ModalForm
            project={selectedProject}
            users={users}
            clients={clients}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProject(null);
            }}
            onSubmit={selectedProject ? 
              (data) => handleUpdateProject(selectedProject._id, data) : 
              handleCreateProject
            }
            fields={[
              {
                name: 'name',
                label: 'Project Name',
                type: 'text',
                required: true
              },
              {
                name: 'description',
                label: 'Description',
                type: 'textarea',
                required: true
              },
              {
                name: 'client',
                label: 'Client',
                type: 'select',
                options: clients.map(client => ({
                  value: client._id,
                  label: client.name
                })),
                required: true
              },
              {
                name: 'manager',
                label: 'Project Manager',
                type: 'select',
                options: users.filter(user => user.role === 'projectManager').map(user => ({
                  value: user._id,
                  label: `${user.firstName} ${user.lastName}`
                })),
                required: true
              },
              {
                name: 'startDate',
                label: 'Start Date',
                type: 'date',
                required: true
              },
              {
                name: 'endDate',
                label: 'End Date',
                type: 'date',
                required: true
              },
              {
                name: 'budget',
                label: 'Budget',
                type: 'number',
                required: true
              },
              {
                name: 'status',
                label: 'Status',
                type: 'select',
                options: [
                  { value: 'Not Started', label: 'Not Started' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'On Hold', label: 'On Hold' },
                  { value: 'Completed', label: 'Completed' }
                ],
                required: true
              }
            ]}
          />
        )}
        
        {isUploadModalOpen && selectedProject && (
          <DocumentUploader
            project={selectedProject}
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUploadDocument}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectManagement;
