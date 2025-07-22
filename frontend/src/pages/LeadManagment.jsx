import React, { useState, useEffect } from 'react';
import { 
  FaProjectDiagram, FaUserPlus, FaUserMinus, FaTasks, FaUserCog, FaPaperPlane, 
  FaSearch, FaBell, FaCalendarAlt, FaChartBar, FaFilter, FaPlus, FaEllipsisV, 
  FaClock, FaCheckCircle, FaExclamationTriangle, FaUser, FaFile, FaTag,
  FaUsers, FaHome, FaEdit, FaTrash, FaEye, FaStar, FaFlag,
  FaComments, FaDownload, FaUpload, FaShare, FaArchive, FaHistory
} from 'react-icons/fa';

const ProjectManagerDashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "Develop a full-featured online shopping platform with modern UI/UX and robust backend infrastructure",
      status: "In Progress",
      priority: "High",
      startDate: "2024-06-15",
      endDate: "2024-09-15",
      budget: 150000,
      progress: 65,
      client: "TechCorp Inc.",
      category: "Web Development",
      tags: ["React", "Node.js", "MongoDB", "Payment"],
      team: [
        { id: 101, name: "John Smith", role: "Frontend Developer", avatar: "JS", workload: 85, selected: false },
        { id: 102, name: "Sarah Johnson", role: "Backend Developer", avatar: "SJ", workload: 70, selected: false },
        { id: 103, name: "Mike Williams", role: "UI Designer", avatar: "MW", workload: 60, selected: false }
      ],
      tasks: [
        { id: 1001, name: "Product Page Design", assignedTo: [102], completed: false, priority: "High", dueDate: "2024-08-01" },
        { id: 1002, name: "Shopping Cart Functionality", assignedTo: [101], completed: false, priority: "Medium", dueDate: "2024-08-05" },
        { id: 1003, name: "Payment Gateway Integration", assignedTo: [101, 102], completed: false, priority: "High", dueDate: "2024-08-10" }
      ],
      messages: [
        { id: 1, text: "Project kickoff meeting scheduled", timestamp: "2024-07-15 10:00", recipient: "Entire Team", sender: "You" },
        { id: 2, text: "Please review the updated design mockups", timestamp: "2024-07-14 15:30", recipient: "Mike Williams", sender: "You" }
      ],
      files: [
        { id: 1, name: "Project Requirements.pdf", size: "2.5 MB", uploadedBy: "You", uploadDate: "2024-07-10" },
        { id: 2, name: "UI Mockups.fig", size: "15.2 MB", uploadedBy: "Mike Williams", uploadDate: "2024-07-12" }
      ]
    },
    {
      id: 2,
      name: "Mobile Banking App",
      description: "Create a secure mobile banking application with biometric authentication and real-time transactions",
      status: "Planning",
      priority: "High",
      startDate: "2024-08-01",
      endDate: "2024-12-01",
      budget: 200000,
      progress: 15,
      client: "SecureBank Ltd.",
      category: "Mobile Development",
      tags: ["React Native", "Security", "Biometrics", "Banking"],
      team: [
        { id: 104, name: "Emily Davis", role: "Mobile Developer", avatar: "ED", workload: 90, selected: false },
        { id: 105, name: "Robert Brown", role: "Security Specialist", avatar: "RB", workload: 75, selected: false }
      ],
      tasks: [
        { id: 1003, name: "Authentication Flow", assignedTo: [105], completed: false, priority: "High", dueDate: "2024-08-15" },
        { id: 1004, name: "Security Architecture", assignedTo: [105], completed: false, priority: "High", dueDate: "2024-08-20" }
      ],
      messages: [],
      files: []
    },
    {
      id: 3,
      name: "CRM System",
      description: "Build customer relationship management software with analytics and automation features",
      status: "Completed",
      priority: "Medium",
      startDate: "2024-04-01",
      endDate: "2024-07-01",
      budget: 100000,
      progress: 100,
      client: "BusinessPro Solutions",
      category: "Enterprise Software",
      tags: ["CRM", "Analytics", "Automation", "Dashboard"],
      team: [
        { id: 101, name: "John Smith", role: "Frontend Developer", avatar: "JS", workload: 40, selected: false },
        { id: 106, name: "Lisa Wilson", role: "Full Stack Developer", avatar: "LW", workload: 30, selected: false }
      ],
      tasks: [
        { id: 1004, name: "Dashboard UI", assignedTo: [101], completed: true, priority: "Medium", dueDate: "2024-06-15" },
        { id: 1005, name: "API Integration", assignedTo: [106], completed: true, priority: "High", dueDate: "2024-06-20" }
      ],
      messages: [],
      files: []
    }
  ]);

  const [allStaff, setAllStaff] = useState([
    { id: 101, name: "John Smith", role: "Frontend Developer", avatar: "JS", hourlyRate: 75, availability: "Available" },
    { id: 102, name: "Sarah Johnson", role: "Backend Developer", avatar: "SJ", hourlyRate: 80, availability: "Available" },
    { id: 103, name: "Mike Williams", role: "UI Designer", avatar: "MW", hourlyRate: 65, availability: "Available" },
    { id: 104, name: "Emily Davis", role: "Mobile Developer", avatar: "ED", hourlyRate: 85, availability: "Busy" },
    { id: 105, name: "Robert Brown", role: "Security Specialist", avatar: "RB", hourlyRate: 90, availability: "Available" },
    { id: 106, name: "Lisa Wilson", role: "Full Stack Developer", avatar: "LW", hourlyRate: 82, availability: "Available" },
    { id: 107, name: "David Moore", role: "QA Engineer", avatar: "DM", hourlyRate: 70, availability: "Available" },
    { id: 108, name: "Anna Taylor", role: "Project Manager", avatar: "AT", hourlyRate: 95, availability: "Available" },
    { id: 109, name: "Chris Lee", role: "DevOps Engineer", avatar: "CL", hourlyRate: 88, availability: "Available" }
  ]);

  const [activeProject, setActiveProject] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTaskName, setNewTaskName] = useState('');
  const [message, setMessage] = useState('');
  const [messageRecipient, setMessageRecipient] = useState('team');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Planning': return 'bg-gray-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Completed': return 'bg-green-500';
      case 'On Hold': return 'bg-yellow-500';
      case 'Cancelled': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProjectStats = () => {
    const totalProjects = projects.length;
    const completed = projects.filter(p => p.status === 'Completed').length;
    const inProgress = projects.filter(p => p.status === 'In Progress').length;
    const planning = projects.filter(p => p.status === 'Planning').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const averageProgress = projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects;

    return { totalProjects, completed, inProgress, planning, totalBudget, averageProgress };
  };

  const toggleTeamMemberSelection = (memberId) => {
    const updatedProjects = [...projects];
    const team = updatedProjects[activeProject].team;
    
    const memberIndex = team.findIndex(m => m.id === memberId);
    if (memberIndex !== -1) {
      team[memberIndex].selected = !team[memberIndex].selected;
      setProjects(updatedProjects);
    }
  };

  const removeSelectedMembers = () => {
    const updatedProjects = [...projects];
    const project = updatedProjects[activeProject];
    
    project.team = project.team.filter(member => !member.selected);
    setProjects(updatedProjects);
  };

  const addStaffToProject = (staff) => {
  const updatedProjects = [...projects];
  const project = updatedProjects[activeProject];
  
  const isAlreadyInTeam = project.team.some(member => member.id === staff.id);
  if (!isAlreadyInTeam) {
    project.team.push({ 
      ...staff, 
      selected: false,
      workload: Math.floor(Math.random() * 40) + 40 // Random workload for demo
    });
  }
  
  setProjects(updatedProjects);
  setShowAddStaffModal(false);
};

  const addNewTask = () => {
    if (!newTaskName.trim()) return;
    
    const updatedProjects = [...projects];
    const project = updatedProjects[activeProject];
    
    project.tasks.push({
      id: Math.max(...project.tasks.map(t => t.id), 0) + 1,
      name: newTaskName,
      assignedTo: [],
      completed: false,
      priority: 'Medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
    
    setProjects(updatedProjects);
    setNewTaskName('');
    setShowTaskModal(false);
  };

  const assignTaskToMember = (taskId, memberId) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[activeProject];
    const task = project.tasks.find(t => t.id === taskId);
    
    if (task) {
      const memberIndex = task.assignedTo.indexOf(memberId);
      if (memberIndex === -1) {
        task.assignedTo.push(memberId);
      } else {
        task.assignedTo.splice(memberIndex, 1);
      }
      setProjects(updatedProjects);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    const updatedProjects = [...projects];
    const project = updatedProjects[activeProject];
    
    const newMessage = {
      id: project.messages.length + 1,
      text: message,
      timestamp: new Date().toLocaleString(),
      recipient: messageRecipient === 'team' ? 'Entire Team' : 
        projects[activeProject].team.find(m => m.id === parseInt(messageRecipient))?.name || 'Unknown',
      sender: 'You'
    };
    
    project.messages.push(newMessage);
    setProjects(updatedProjects);
    setMessage('');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedProjects = [...projects];
    const project = updatedProjects[activeProject];
    const task = project.tasks.find(t => t.id === taskId);
    
    if (task) {
      task.completed = !task.completed;
      setProjects(updatedProjects);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = getProjectStats();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaProjectDiagram className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaClock className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-purple-600">${stats.totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaChartBar className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Project Progress Overview</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{project.name}</p>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{project.progress}% complete</p>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Workload */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Team Workload</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allStaff.slice(0, 6).map((staff) => (
            <div key={staff.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {staff.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{staff.name}</p>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  staff.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {staff.availability}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Capacity</span>
                  <span>{Math.floor(Math.random() * 40) + 60}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProjectDetails = () => (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">{projects[activeProject].name}</h1>
            <span className={`text-sm px-3 py-1 rounded-full text-white ${getStatusColor(projects[activeProject].status)}`}>
              {projects[activeProject].status}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(projects[activeProject].priority)}`}>
              {projects[activeProject].priority} Priority
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-600">
              <FaShare />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <FaDownload />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mt-2">{projects[activeProject].description}</p>
        
        {/* Project Meta Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">Client</p>
            <p className="text-gray-900">{projects[activeProject].client}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Budget</p>
            <p className="text-gray-900">${projects[activeProject].budget.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Start Date</p>
            <p className="text-gray-900">{new Date(projects[activeProject].startDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">End Date</p>
            <p className="text-gray-900">{new Date(projects[activeProject].endDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{projects[activeProject].progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${projects[activeProject].progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FaUsers className="mr-2" /> Team Management
          </h3>
          <div className="flex space-x-2">
            <button 
  onClick={() => setShowAddStaffModal(true)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium"
>
  <FaUserPlus className="mr-2" /> Add Member
</button>
            <button 
              onClick={removeSelectedMembers}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium"
            >
              <FaUserMinus className="mr-2" /> Remove Selected
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects[activeProject].team.map(member => (
            <div 
              key={member.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                member.selected 
                  ? 'bg-blue-50 border-blue-200 shadow-sm' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => toggleTeamMemberSelection(member.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={member.selected}
                  onChange={() => toggleTeamMemberSelection(member.id)}
                  className="rounded text-blue-500"
                />
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Workload</span>
                  <span>{member.workload}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      member.workload > 80 ? 'bg-red-500' : 
                      member.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${member.workload}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Management */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <FaTasks className="mr-2" /> Task Management
          </h3>
          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium"
          >
            <FaPlus className="mr-2" /> Add Task
          </button>
        </div>
        
        <div className="space-y-4">
          {projects[activeProject].tasks.map(task => (
            <div key={task.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="rounded text-green-500"
                  />
                  <span className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                <span>Assigned to: {task.assignedTo.length} member(s)</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {projects[activeProject].team.map(member => (
                  <label key={member.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={task.assignedTo.includes(member.id)}
                      onChange={() => assignTaskToMember(task.id, member.id)}
                      className="rounded text-blue-500"
                    />
                    <span>{member.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Communication */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FaComments className="mr-2" /> Team Communication
        </h3>
        
        <div className="flex items-center mb-4">
          <span className="mr-2 text-sm font-medium">Send to:</span>
          <select
            value={messageRecipient}
            onChange={(e) => setMessageRecipient(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="team">Entire Team</option>
            {projects[activeProject].team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium"
          >
            <FaPaperPlane className="mr-2" /> Send
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {projects[activeProject].messages.map((msg) => (
            <div key={msg.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-900">{msg.sender}</span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">To: {msg.recipient}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h2 className="text-3xl font-bold text-gray-900">Project Lead Dashboard</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaProjectDiagram className="mr-2" /> Projects
          </h3>
          <ul className="space-y-2">
            {filteredProjects.map((project, index) => (
              <li
                key={project.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeProject === index
                    ? 'bg-blue-100 text-blue-800 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveProject(index)}
              >
                {project.name}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                activeTab === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                activeTab === 'details'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Project Details
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'overview' ? renderOverview() : renderProjectDetails()}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagerDashboard;
