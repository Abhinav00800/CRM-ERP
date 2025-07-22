import React, { useState, useEffect } from 'react';
import { 
  FaTasks, FaUsers, FaCommentDots, FaPaperPlane, FaSearch, FaBell, 
  FaCalendarAlt, FaChartBar, FaFilter, FaPlus, FaEllipsisV, FaClock,
  FaCheckCircle, FaExclamationTriangle, FaUser, FaFile, FaTag,
  FaArrowUp, FaArrowDown, FaMinus, FaStar, FaHome, FaCog
} from 'react-icons/fa';

const StaffDashboard = () => {
  const [activeTask, setActiveTask] = useState(0);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Enhanced task data with more fields
  const tasks = [
  {
    id: 1,
    name: "Implement User Authentication",
    team: "Frontend Team",
    members: ["John Doe", "Jane Smith", "Mike Johnson"],
    lead: "Sarah Williams",
    description: "Create login/signup pages with JWT authentication. Ensure all security protocols are followed and implement password recovery flow.",
    status: "In Progress",
    priority: "High",
    deadline: "2024-08-15",
    progress: 65,
    tags: ["React", "Security", "API"],
    assignedTo: "You",
    createdDate: "2024-07-01",
    messages: [
      { sender: "Sarah Williams", text: "Please prioritize the login page first", time: "10:30 AM", type: "message" },
      { sender: "You", text: "Working on the form validation now", time: "11:15 AM", type: "message" },
      { sender: "Sarah Williams", text: "Great! Don't forget the email verification step", time: "11:30 AM", type: "message" }
    ]
  },
  {
    id: 2,
    name: "Database Schema Design",
    team: "Backend Team",
    members: ["Alex Brown", "Emily Davis", "You"],
    lead: "Robert Taylor",
    description: "Design MongoDB schema for user profiles and projects. Include proper indexing and relationships between collections.",
    status: "Pending Review",
    priority: "Medium",
    deadline: "2024-08-10",
    progress: 80,
    tags: ["MongoDB", "Database", "Schema"],
    assignedTo: "You",
    createdDate: "2024-06-28",
    messages: [
      { sender: "Robert Taylor", text: "Don't forget to include timestamps in all models", time: "9:00 AM", type: "message" },
      { sender: "You", text: "Should we use references or embedded documents for the user-project relationship?", time: "9:45 AM", type: "message" }
    ]
  },
  {
    id: 3,
    name: "UI Prototyping",
    team: "Design Team",
    members: ["You", "Lisa Wilson", "David Moore"],
    lead: "Jessica Lee",
    description: "Create Figma prototypes for all dashboard screens including responsive designs for mobile and tablet.",
    status: "Completed",
    priority: "Low",
    deadline: "2024-07-30",
    progress: 100,
    tags: ["Figma", "Design", "Mobile"],
    assignedTo: "You",
    createdDate: "2024-07-05",
    messages: [
      { sender: "Jessica Lee", text: "Great work on the color scheme!", time: "Yesterday", type: "message" },
      { sender: "You", text: "Thanks! Should I start on the mobile views?", time: "Yesterday", type: "message" },
      { sender: "Jessica Lee", text: "Yes, please focus on the mobile navigation first", time: "Yesterday", type: "message" }
    ]
  },
  {
    id: 4,
    name: "API Documentation",
    team: "Backend Team",
    members: ["You", "Mark Johnson", "Lisa Ray"],
    lead: "Robert Taylor",
    description: "Document all API endpoints with examples for request/response payloads. Include error codes and authentication requirements.",
    status: "Not Started",
    priority: "Medium",
    deadline: "2024-08-20",
    progress: 0,
    tags: ["API", "Documentation", "Swagger"],
    assignedTo: "You",
    createdDate: "2024-07-10",
    messages: [
      { sender: "Robert Taylor", text: "We'll use Swagger for the documentation", time: "2 days ago", type: "message" },
      { sender: "Robert Taylor", text: "Please review the existing endpoints first", time: "2 days ago", type: "message" }
    ]
  },
  {
    id: 5,
    name: "Set Up CI/CD Pipeline",
    team: "DevOps Team",
    members: ["You", "Nathan Hall", "Mia Kim"],
    lead: "Daniel Clark",
    description: "Configure GitHub Actions for automatic testing and deployment to staging and production environments.",
    status: "In Progress",
    priority: "High",
    deadline: "2024-08-18",
    progress: 40,
    tags: ["CI/CD", "DevOps", "GitHub Actions"],
    assignedTo: "You",
    createdDate: "2024-07-03",
    messages: [
      { sender: "Daniel Clark", text: "Make sure to encrypt the secrets properly", time: "Today", type: "message" },
      { sender: "You", text: "Pipeline is half set up, working on test jobs now", time: "Today", type: "message" }
    ]
  },
  {
    id: 6,
    name: "Accessibility Audit",
    team: "QA Team",
    members: ["You", "Priya Mehta", "Kevin Scott"],
    lead: "Aisha Thomas",
    description: "Run accessibility tests across major screens using Axe and Lighthouse. Provide remediation plan.",
    status: "In Progress",
    priority: "Medium",
    deadline: "2024-08-12",
    progress: 55,
    tags: ["Accessibility", "Testing", "Lighthouse"],
    assignedTo: "You",
    createdDate: "2024-07-06",
    messages: [
      { sender: "Aisha Thomas", text: "Focus on color contrast and keyboard navigation", time: "1 hour ago", type: "message" }
    ]
  },
  {
    id: 7,
    name: "Create Marketing Landing Page",
    team: "Frontend Team",
    members: ["You", "Samantha Ray", "Chris Lopez"],
    lead: "Amanda Young",
    description: "Design and develop a responsive landing page for the upcoming product launch.",
    status: "Not Started",
    priority: "High",
    deadline: "2024-08-25",
    progress: 0,
    tags: ["LandingPage", "Marketing", "React"],
    assignedTo: "You",
    createdDate: "2024-07-02",
    messages: [
      { sender: "Amanda Young", text: "Keep it modern and responsive", time: "Yesterday", type: "message" }
    ]
  },
  {
    id: 8,
    name: "Integrate Payment Gateway",
    team: "Backend Team",
    members: ["You", "Carlos Diaz", "Hannah Green"],
    lead: "Robert Taylor",
    description: "Integrate Stripe API for handling user payments, subscriptions, and invoicing.",
    status: "In Progress",
    priority: "High",
    deadline: "2024-08-22",
    progress: 30,
    tags: ["Stripe", "Payment", "API"],
    assignedTo: "You",
    createdDate: "2024-07-04",
    messages: [
      { sender: "Robert Taylor", text: "Double-check webhook security", time: "Today", type: "message" }
    ]
  },
  {
    id: 9,
    name: "Create Onboarding Walkthrough",
    team: "Design Team",
    members: ["You", "Olivia White", "Ethan Brooks"],
    lead: "Jessica Lee",
    description: "Design a guided walkthrough for new users using tooltips and modals.",
    status: "Pending Review",
    priority: "Medium",
    deadline: "2024-08-17",
    progress: 75,
    tags: ["Onboarding", "UX", "Tutorial"],
    assignedTo: "You",
    createdDate: "2024-07-07",
    messages: [
      { sender: "Jessica Lee", text: "Make the messages engaging and concise", time: "2 hours ago", type: "message" }
    ]
  },
  {
    id: 10,
    name: "Set Up Unit Testing",
    team: "QA Team",
    members: ["You", "Jason Miller", "Aria Shah"],
    lead: "Aisha Thomas",
    description: "Implement Jest-based unit testing across frontend components with at least 80% coverage.",
    status: "In Progress",
    priority: "Medium",
    deadline: "2024-08-14",
    progress: 60,
    tags: ["Jest", "Testing", "Coverage"],
    assignedTo: "You",
    createdDate: "2024-07-08",
    messages: [
      { sender: "Aisha Thomas", text: "Coverage report looks good so far", time: "Today", type: "message" },
      { sender: "You", text: "I’ll finish the remaining tests by tomorrow", time: "Today", type: "message" }
    ]
  }
];


  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Initialize messages state
  useEffect(() => {
    if (Object.keys(messages).length === 0) {
      const initialMessages = {};
      tasks.forEach(task => {
        initialMessages[task.id] = task.messages;
      });
      setMessages(initialMessages);
    }
  }, [tasks]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "message"
    };

    setMessages(prev => ({
      ...prev,
      [tasks[activeTask].id]: [...prev[tasks[activeTask].id], newMessage]
    }));

    setMessage('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-blue-500';
      case 'Pending Review': return 'bg-yellow-500';
      case 'Completed': return 'bg-green-500';
      case 'Not Started': return 'bg-gray-500';
      default: return 'bg-gray-500';
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const pending = tasks.filter(t => t.status === 'Pending Review').length;
    const notStarted = tasks.filter(t => t.status === 'Not Started').length;
    
    return { completed, inProgress, pending, notStarted, total: tasks.length };
  };

  const stats = getTaskStats();

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaTasks className="text-blue-600 text-xl" />
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
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <FaExclamationTriangle className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{task.name}</p>
                  <p className="text-sm text-gray-500">{task.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{task.progress}% complete</p>
                <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTaskDetails = () => (
    <>
      {/* Task Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">{tasks[activeTask].name}</h1>
            <span className={`text-sm px-3 py-1 rounded-full text-white ${getStatusColor(tasks[activeTask].status)}`}>
              {tasks[activeTask].status}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(tasks[activeTask].priority)}`}>
              {tasks[activeTask].priority} Priority
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              <FaCalendarAlt className="inline mr-1" />
              Due: {new Date(tasks[activeTask].deadline).toLocaleDateString()}
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FaEllipsisV />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{tasks[activeTask].progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${tasks[activeTask].progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Task Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Team Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <FaUsers className="mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Team Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Team</p>
              <p className="text-gray-900">{tasks[activeTask].team}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Team Lead</p>
              <p className="text-gray-900">{tasks[activeTask].lead}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Members</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {tasks[activeTask].members.map((member, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Task Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Task Description</h3>
          <p className="text-gray-700 mb-4">{tasks[activeTask].description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tasks[activeTask].tags.map((tag, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                <FaTag className="inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Created</p>
              <p className="text-gray-900">{new Date(tasks[activeTask].createdDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Assigned to</p>
              <p className="text-gray-900">{tasks[activeTask].assignedTo}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Chat */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaCommentDots className="mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold">Team Chat</h3>
          </div>
          <span className="text-sm text-gray-500">
            {messages[tasks[activeTask].id]?.length || 0} messages
          </span>
        </div>
        
        {/* Messages */}
        <div className="h-80 overflow-y-auto mb-4 pr-4 space-y-4 border-t border-gray-100 pt-4">
          {messages[tasks[activeTask].id]?.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  msg.sender === 'You' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-sm font-medium ${
                    msg.sender === 'You' ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {msg.sender}
                  </span>
                  <span className={`text-xs ml-2 ${
                    msg.sender === 'You' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg px-4 py-2 transition-colors"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <FaBell />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FaCog/>
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaHome className="inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'tasks' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaTasks className="inline mr-2" />
              Tasks
            </button>
          </div>
        </div>
        
        {/* Task List */}
        {activeTab === 'tasks' && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredTasks.map((task, index) => (
                <div 
                  key={task.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                    activeTask === index 
                      ? 'bg-blue-50 border-blue-200 shadow-sm' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTask(index)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{task.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{task.team}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-12 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{task.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Time */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <FaClock className="inline mr-1" />
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {activeTab === 'overview' ? renderOverview() : renderTaskDetails()}
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;