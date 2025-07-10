// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProjectCard from '../components/Project/ProjectCard';
// import SearchFilterSort from '../components/Project/SearchFilterSort';
// import ModalForm from '../components/Project/ModalForm';
// import DocumentUploader from '../components/Project/DocumentUploader';
// // import { fetchProjects, createProject, updateProject, uploadDocument } from '../services/Project/projectService';
// // import { fetchUsers } from '../services/Project/userService';
// // import { fetchClients } from '../services/Project/clientService';

// // Replace these imports:
// // import { fetchProjects, createProject, updateProject, uploadDocument } from '../services/Project/projectService';
// // import { fetchUsers } from '../services/Project/userService';
// // import { fetchClients } from '../services/Project/clientService';

// // With these mock imports:
// import { 
//   fetchProjects, 
//   createProject, 
//   updateProject, 
//   uploadDocument,
//   fetchUsers,
//   fetchClients 
// } from '../services/Project/mockServices';


// const ProjectManagement = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [projectsData, usersData, clientsData] = await Promise.all([
//           fetchProjects(),
//           fetchUsers(),
//           fetchClients()
//         ]);
        
//         setProjects(projectsData);
//         setFilteredProjects(projectsData);
//         setUsers(usersData);
//         setClients(clientsData);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    
//     loadData();
//   }, []);

//   const handleSearch = (searchTerm) => {
//     if (!searchTerm) {
//       setFilteredProjects(projects);
//       return;
//     }
    
//     const filtered = projects.filter(project => 
//       project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (project.client && project.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
    
//     setFilteredProjects(filtered);
//   };

//   const handleFilter = (filters) => {
//     let filtered = [...projects];
    
//     if (filters.status) {
//       filtered = filtered.filter(project => project.status === filters.status);
//     }
    
//     if (filters.manager) {
//       filtered = filtered.filter(project => 
//         project.manager && project.manager._id === filters.manager
//       );
//     }
    
//     setFilteredProjects(filtered);
//   };

//   const handleSort = (sortOption) => {
//     let sorted = [...filteredProjects];
    
//     switch (sortOption) {
//       case 'name':
//         sorted.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case 'deadline':
//         sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
//         break;
//       case 'status':
//         sorted.sort((a, b) => a.status.localeCompare(b.status));
//         break;
//       default:
//         break;
//     }
    
//     setFilteredProjects(sorted);
//   };

//   const handleProjectClick = (project) => {
//     navigate(`/projects/${project._id}`);
//   };

//   const handleEditProject = (project) => {
//     setSelectedProject(project);
//     setIsModalOpen(true);
//   };

//   const handleSubmitProject = async (projectData) => {
//     try {
//       let updatedProject;
      
//       if (selectedProject) {
//         updatedProject = await updateProject(selectedProject._id, projectData);
//         setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
//       } else {
//         updatedProject = await createProject(projectData);
//         setProjects([...projects, updatedProject]);
//       }
      
//       setFilteredProjects([...filteredProjects, updatedProject]);
//       setIsModalOpen(false);
//       setSelectedProject(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleUploadDocument = async (projectId, file, documentName) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('name', documentName);
      
//       const updatedProject = await uploadDocument(projectId, formData);
//       setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
//       setIsUploadModalOpen(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
//         <div className="flex space-x-4">
//           <button
//             onClick={() => {
//               setSelectedProject(null);
//               setIsModalOpen(true);
//             }}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//           >
//             Add Project
//           </button>
//         </div>
//       </div>
      
//       <SearchFilterSort 
//         onSearch={handleSearch}
//         onFilter={handleFilter}
//         onSort={handleSort}
//         filterOptions={{
//           status: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
//           managers: users.filter(u => u.role === 'projectManager').map(u => ({
//             value: u._id,
//             label: `${u.firstName} ${u.lastName}`
//           }))
//         }}
//         sortOptions={[
//           { value: 'name', label: 'Name' },
//           { value: 'deadline', label: 'Deadline' },
//           { value: 'status', label: 'Status' }
//         ]}
//       />
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//         {filteredProjects.map(project => (
//           <ProjectCard
//             key={project._id}
//             project={project}
//             onClick={() => handleProjectClick(project)}
//             onEdit={() => handleEditProject(project)}
//             onUpload={() => {
//               setSelectedProject(project);
//               setIsUploadModalOpen(true);
//             }}
//           />
//         ))}
//       </div>
      
//       {isModalOpen && (
//         <ModalForm
//           title={selectedProject ? 'Edit Project' : 'Add Project'}
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedProject(null);
//           }}
//           onSubmit={handleSubmitProject}
//           initialData={selectedProject || {}}
//           fields={[
//             {
//               name: 'name',
//               label: 'Project Name',
//               type: 'text',
//               required: true
//             },
//             {
//               name: 'description',
//               label: 'Description',
//               type: 'textarea'
//             },
//             {
//               name: 'client',
//               label: 'Client',
//               type: 'select',
//               options: clients.map(client => ({
//                 value: client._id,
//                 label: client.name
//               })),
//               required: true
//             },
//             {
//               name: 'manager',
//               label: 'Project Manager',
//               type: 'select',
//               options: users
//                 .filter(user => user.role === 'projectManager')
//                 .map(user => ({
//                   value: user._id,
//                   label: `${user.firstName} ${user.lastName}`
//                 })),
//               required: true
//             },
//             {
//               name: 'teamMembers',
//               label: 'Team Members',
//               type: 'multiselect',
//               options: users.map(user => ({
//                 value: user._id,
//                 label: `${user.firstName} ${u.lastName}`
//               }))
//             },
//             {
//               name: 'startDate',
//               label: 'Start Date',
//               type: 'date',
//               required: true
//             },
//             {
//               name: 'endDate',
//               label: 'End Date',
//               type: 'date',
//               required: true
//             },
//             {
//               name: 'budget',
//               label: 'Budget',
//               type: 'number',
//               required: true
//             },
//             {
//               name: 'status',
//               label: 'Status',
//               type: 'select',
//               options: [
//                 { value: 'Not Started', label: 'Not Started' },
//                 { value: 'In Progress', label: 'In Progress' },
//                 { value: 'Completed', label: 'Completed' },
//                 { value: 'On Hold', label: 'On Hold' }
//               ],
//               required: true
//             }
//           ]}
//         />
//       )}
      
//       {isUploadModalOpen && selectedProject && (
//         <DocumentUploader
//           project={selectedProject}
//           onClose={() => setIsUploadModalOpen(false)}
//           onUpload={handleUploadDocument}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectManagement;



import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, Users, DollarSign, Clock, Edit, Upload, Eye, MoreVertical, ChevronDown, X } from 'lucide-react';

// Mock Data
const mockProjects = [
  {
    _id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete redesign of the company e-commerce platform with modern UI/UX',
    client: { _id: 'c1', name: 'TechCorp Solutions' },
    manager: { _id: 'm1', firstName: 'Sarah', lastName: 'Johnson' },
    teamMembers: [
      { _id: 't1', firstName: 'John', lastName: 'Doe' },
      { _id: 't2', firstName: 'Jane', lastName: 'Smith' },
      { _id: 't3', firstName: 'Mike', lastName: 'Wilson' }
    ],
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 150000,
    status: 'In Progress',
    progress: 65,
    priority: 'High'
  },
  {
    _id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    client: { _id: 'c2', name: 'StartupXYZ' },
    manager: { _id: 'm2', firstName: 'David', lastName: 'Brown' },
    teamMembers: [
      { _id: 't4', firstName: 'Alice', lastName: 'Johnson' },
      { _id: 't5', firstName: 'Bob', lastName: 'Davis' }
    ],
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    budget: 200000,
    status: 'In Progress',
    progress: 45,
    priority: 'Medium'
  },
  {
    _id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Business intelligence dashboard for real-time analytics',
    client: { _id: 'c3', name: 'DataFlow Inc' },
    manager: { _id: 'm3', firstName: 'Emily', lastName: 'Taylor' },
    teamMembers: [
      { _id: 't6', firstName: 'Chris', lastName: 'Anderson' },
      { _id: 't7', firstName: 'Lisa', lastName: 'Martinez' }
    ],
    startDate: '2024-03-01',
    endDate: '2024-05-30',
    budget: 80000,
    status: 'Completed',
    progress: 100,
    priority: 'Low'
  },
  {
    _id: '4',
    name: 'Cloud Migration Project',
    description: 'Migration of legacy systems to cloud infrastructure',
    client: { _id: 'c4', name: 'Enterprise Corp' },
    manager: { _id: 'm1', firstName: 'Sarah', lastName: 'Johnson' },
    teamMembers: [
      { _id: 't8', firstName: 'Tom', lastName: 'Wilson' },
      { _id: 't9', firstName: 'Anna', lastName: 'Garcia' }
    ],
    startDate: '2024-04-01',
    endDate: '2024-09-30',
    budget: 300000,
    status: 'Not Started',
    progress: 0,
    priority: 'High'
  }
];

const mockUsers = [
  { _id: 'm1', firstName: 'Sarah', lastName: 'Johnson', role: 'projectManager' },
  { _id: 'm2', firstName: 'David', lastName: 'Brown', role: 'projectManager' },
  { _id: 'm3', firstName: 'Emily', lastName: 'Taylor', role: 'projectManager' },
  { _id: 't1', firstName: 'John', lastName: 'Doe', role: 'developer' },
  { _id: 't2', firstName: 'Jane', lastName: 'Smith', role: 'designer' },
  { _id: 't3', firstName: 'Mike', lastName: 'Wilson', role: 'developer' },
  { _id: 't4', firstName: 'Alice', lastName: 'Johnson', role: 'developer' },
  { _id: 't5', firstName: 'Bob', lastName: 'Davis', role: 'developer' },
  { _id: 't6', firstName: 'Chris', lastName: 'Anderson', role: 'analyst' },
  { _id: 't7', firstName: 'Lisa', lastName: 'Martinez', role: 'analyst' },
  { _id: 't8', firstName: 'Tom', lastName: 'Wilson', role: 'developer' },
  { _id: 't9', firstName: 'Anna', lastName: 'Garcia', role: 'developer' }
];

const mockClients = [
  { _id: 'c1', name: 'TechCorp Solutions' },
  { _id: 'c2', name: 'StartupXYZ' },
  { _id: 'c3', name: 'DataFlow Inc' },
  { _id: 'c4', name: 'Enterprise Corp' }
];

// Components
const ProjectCard = ({ project, onClick, onEdit, onUpload }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 cursor-pointer" onClick={() => onClick(project)}>
              {project.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{project.client.name}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button
                  onClick={() => { onClick(project); setShowMenu(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => { onEdit(project); setShowMenu(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Project
                </button>
                <button
                  onClick={() => { onUpload(project); setShowMenu(false); }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(project.endDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>{formatCurrency(project.budget)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{project.teamMembers.length} members</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{project.manager.firstName} {project.manager.lastName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchFilterSort = ({ onSearch, onFilter, onSort, filterOptions, sortOptions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleSort = (value) => {
    setSortBy(value);
    onSort(value);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSortBy('');
    onFilter({});
    onSearch('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sort by...</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {(Object.keys(filters).length > 0 || searchTerm || sortBy) && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                {filterOptions.status.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
              <select
                value={filters.manager || ''}
                onChange={(e) => handleFilterChange('manager', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Managers</option>
                {filterOptions.managers.map(manager => (
                  <option key={manager.value} value={manager.value}>
                    {manager.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filters.priority || ''}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalForm = ({ title, onClose, onSubmit, initialData, fields }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map(field => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'text' && (
                <input
                  type="text"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                />
              )}
              
              {field.type === 'textarea' && (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
              
              {field.type === 'select' && (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              
              {field.type === 'date' && (
                <input
                  type="date"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                />
              )}
              
              {field.type === 'number' && (
                <input
                  type="number"
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={field.required}
                />
              )}
            </div>
          ))}
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {initialData._id ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DocumentUploader = ({ project, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && documentName) {
      onUpload(project._id, file, documentName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Component
const ProjectManagement = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [users] = useState(mockUsers);
  const [clients] = useState(mockClients);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    
    if (filters.priority) {
      filtered = filtered.filter(project => project.priority === filters.priority);
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
      case 'status':
        sorted.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'priority':
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      default:
        break;
    }
    
    setFilteredProjects(sorted);
  };

  const handleProjectClick = (project) => {
    console.log('Navigate to project:', project._id);
    // In a real app, this would use navigate(`/projects/${project._id}`);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSubmitProject = (projectData) => {
    try {
      if (selectedProject) {
        // Update existing project
        const updatedProjects = projects.map(p => 
          p._id === selectedProject._id ? { ...p, ...projectData } : p
        );
        setProjects(updatedProjects);
        setFilteredProjects(updatedProjects);
      } else {
        // Create new project
        const newProject = {
          ...projectData,
          _id: Date.now().toString(),
          progress: 0,
          priority: projectData.priority || 'Medium'
        };
        setProjects([...projects, newProject]);
        setFilteredProjects([...filteredProjects, newProject]);
      }
      
      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUploadDocument = (projectId, file, documentName) => {
    try {
      console.log('Upload document:', { projectId, file, documentName });
      // In a real app, this would make an API call
      setIsUploadModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-8 p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600 mt-1">Manage and track your projects efficiently</p>
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setIsModalOpen(true);
              }}
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Project
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'In Progress').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {projects.filter(p => p.status === 'Completed').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Budget</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filter */}
        <SearchFilterSort 
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          filterOptions={{
            status: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
            managers: users.filter(u => u.role === 'projectManager').map(u => ({
              value: u._id,
              label: `${u.firstName} ${u.lastName}`
            }))
          }}
          sortOptions={[
            { value: 'name', label: 'Name' },
            { value: 'deadline', label: 'Deadline' },
            { value: 'status', label: 'Status' },
            { value: 'priority', label: 'Priority' }
          ]}
        />
        
        {/* Projects Grid */}
        <div className="mt-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={handleProjectClick}
                  onEdit={handleEditProject}
                  onUpload={() => {
                    setSelectedProject(project);
                    setIsUploadModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Modals */}
        {isModalOpen && (
          <ModalForm
            title={selectedProject ? 'Edit Project' : 'Create New Project'}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedProject(null);
            }}
            onSubmit={handleSubmitProject}
            initialData={selectedProject || {}}
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
                type: 'textarea'
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
                options: users
                  .filter(user => user.role === 'projectManager')
                  .map(user => ({
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
                label: 'Budget ($)',
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
                  { value: 'Completed', label: 'Completed' },
                  { value: 'On Hold', label: 'On Hold' }
                ],
                required: true
              },
              {
                name: 'priority',
                label: 'Priority',
                type: 'select',
                options: [
                  { value: 'High', label: 'High' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'Low', label: 'Low' }
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