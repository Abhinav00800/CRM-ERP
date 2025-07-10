const simulateNetworkDelay = () =>
  new Promise((res) => setTimeout(res, 500));

const mockClients = [
  { _id: '1', name: 'Acme Corp', email: 'contact@acme.com' },
  { _id: '2', name: 'Tech Solutions', email: 'info@techsolutions.com' },
  { _id: '3', name: 'Global Industries', email: 'hello@global.com' },
  { _id: '4', name: 'BrightSoft', email: 'contact@brightsoft.io' },
  { _id: '5', name: 'NeoFin', email: 'support@neofin.com' }
];

const mockUsers = [
  { _id: '1', firstName: 'John', lastName: 'Doe', role: 'projectManager' },
  { _id: '2', firstName: 'Jane', lastName: 'Smith', role: 'developer' },
  { _id: '3', firstName: 'Mike', lastName: 'Johnson', role: 'projectManager' },
  { _id: '4', firstName: 'Sarah', lastName: 'Williams', role: 'developer' },
  { _id: '5', firstName: 'Emma', lastName: 'Davis', role: 'designer' },
  { _id: '6', firstName: 'Liam', lastName: 'Brown', role: 'developer' },
  { _id: '7', firstName: 'Olivia', lastName: 'Miller', role: 'projectManager' }
];

let mockProjects = [
  {
    _id: 'p1',
    name: 'Website Redesign',
    description: 'Overhaul the entire Acme Corp website with modern UI',
    client: mockClients[0],
    manager: mockUsers[0],
    teamMembers: [mockUsers[1], mockUsers[4]],
    startDate: '2024-01-10',
    endDate: '2024-06-10',
    budget: 20000,
    status: 'In Progress',
    documents: []
  },
  {
    _id: 'p2',
    name: 'Mobile App Development',
    description: 'Build a cross-platform app for Tech Solutions',
    client: mockClients[1],
    manager: mockUsers[2],
    teamMembers: [mockUsers[3], mockUsers[5]],
    startDate: '2024-02-01',
    endDate: '2024-07-01',
    budget: 35000,
    status: 'Not Started',
    documents: []
  },
  {
    _id: 'p3',
    name: 'CRM System',
    description: 'Develop internal CRM for Global Industries',
    client: mockClients[2],
    manager: mockUsers[6],
    teamMembers: [mockUsers[1], mockUsers[3], mockUsers[5]],
    startDate: '2024-03-05',
    endDate: '2024-10-30',
    budget: 50000,
    status: 'Completed',
    documents: []
  },
  {
    _id: 'p4',
    name: 'Analytics Dashboard',
    description: 'Create real-time dashboards for BrightSoft analytics',
    client: mockClients[3],
    manager: mockUsers[0],
    teamMembers: [mockUsers[4], mockUsers[5]],
    startDate: '2024-04-15',
    endDate: '2024-08-20',
    budget: 28000,
    status: 'On Hold',
    documents: []
  },
  {
    _id: 'p5',
    name: 'Banking API Integration',
    description: 'Integrate third-party APIs for NeoFin banking software',
    client: mockClients[4],
    manager: mockUsers[6],
    teamMembers: [mockUsers[2], mockUsers[6]],
    startDate: '2024-05-01',
    endDate: '2024-12-15',
    budget: 45000,
    status: 'In Progress',
    documents: []
  }
];

// ✅ original fetch functions
export const fetchProjects = async () => {
  return [...mockProjects];
};

export const fetchUsers = async () => {
  return [...mockUsers];
};

export const fetchClients = async () => {
  return [...mockClients];
};

// ✅ original createProject (with async corrections)
export const createProject = async (projectData) => {
  const client = mockClients.find(c => c._id === projectData.client);
  const manager = mockUsers.find(u => u._id === projectData.manager);
  const teamMembers = mockUsers.filter(u => projectData.teamMembers.includes(u._id));

  const newProject = {
    ...projectData,
    _id: Math.random().toString(36).substring(2, 9),
    client,
    manager,
    teamMembers,
    documents: []
  };

  mockProjects.push(newProject);
  return newProject;
};

// ✅ original updateProject
export const updateProject = async (projectId, projectData) => {
  const index = mockProjects.findIndex(p => p._id === projectId);
  if (index === -1) throw new Error('Project not found');

  const updated = {
    ...projectData,
    _id: projectId,
    client: mockClients.find(c => c._id === projectData.client),
    manager: mockUsers.find(u => u._id === projectData.manager),
    teamMembers: mockUsers.filter(u => projectData.teamMembers.includes(u._id))
  };

  mockProjects[index] = updated;
  return updated;
};

// ✅ original uploadDocument
export const uploadDocument = async (projectId, formData) => {
  const documentName = formData.get('name') || 'Document';
  const file = formData.get('file');
  const fileType = file?.name?.split('.').pop() || 'pdf';

  const newDoc = {
    name: documentName,
    url: `https://mockcdn.com/docs/${projectId}/${documentName}.${fileType}`,
    uploadedAt: new Date().toISOString()
  };

  const index = mockProjects.findIndex(p => p._id === projectId);
  if (index !== -1) {
    mockProjects[index].documents.push(newDoc);
  }

  return {
    ...mockProjects[index],
    documents: [...mockProjects[index].documents]
  };
};

// ✅ original uploadProjectDocument (with simulate delay)
export const uploadProjectDocument = async (projectId, formData) => {
  await simulateNetworkDelay();
  const documentName = formData.get('name') || `Document_${Math.random().toString(36).substring(2, 5)}`;
  const file = formData.get('file');
  const fileType = file?.name?.split('.').pop() || 'pdf';

  const newDocument = {
    name: documentName,
    url: `https://mockcdn.com/projects/${projectId}/${documentName}.${fileType}`,
    uploadedAt: new Date().toISOString(),
    type: fileType
  };

  mockProjects = mockProjects.map(project => {
    if (project._id === projectId) {
      return {
        ...project,
        documents: [...project.documents, newDocument]
      };
    }
    return project;
  });

  return {
    ...mockProjects.find(p => p._id === projectId),
    documents: [newDocument]
  };
};
