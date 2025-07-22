import React, { useState } from 'react';
import { 
  FiUsers, 
  FiBriefcase, 
  FiCalendar, 
  FiDollarSign, 
  FiPieChart, 
  FiShoppingCart,
  FiSettings,
  FiBell,
  FiSearch
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample tabs - these would be replaced with actual components
  const tabs = {
    dashboard: <DashboardOverview />,
    users: <UserManagement />,
    projects: <ProjectManagement />,
    tasks: <TaskManagement />,
    customers: <CustomerManagement />,
    inventory: <InventoryManagement />,
    reports: <ReportsAnalytics />,
    settings: <SystemSettings />
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">CRM-ERP Portal</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-blue-700"
          >
            {sidebarOpen ? '◄' : '►'}
          </button>
        </div>
        <nav className="mt-6">
          {Object.entries({
            dashboard: 'Dashboard',
            users: 'Users',
            projects: 'Projects',
            tasks: 'Tasks',
            customers: 'Customers',
            inventory: 'Inventory',
            reports: 'Reports',
            settings: 'Settings'
          }).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center w-full p-4 ${activeTab === key ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              {key === 'dashboard' && <FiPieChart className="mr-3" />}
              {key === 'users' && <FiUsers className="mr-3" />}
              {key === 'projects' && <FiBriefcase className="mr-3" />}
              {key === 'tasks' && <FiCalendar className="mr-3" />}
              {key === 'customers' && <FiUsers className="mr-3" />}
              {key === 'inventory' && <FiShoppingCart className="mr-3" />}
              {key === 'reports' && <FiDollarSign className="mr-3" />}
              {key === 'settings' && <FiSettings className="mr-3" />}
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-64"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FiBell className="text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                A
              </div>
              {sidebarOpen && <span className="ml-2">Admin</span>}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          {tabs[activeTab]}
        </main>
      </div>
    </div>
  );
};

// Placeholder components for each tab
const DashboardOverview = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard 
        title="Total Users" 
        value="0" 
        icon={<FiUsers className="text-blue-500" />} 
      />
      <MetricCard 
        title="Active Projects" 
        value="0" 
        icon={<FiBriefcase className="text-green-500" />} 
      />
      <MetricCard 
        title="Pending Tasks" 
        value="0" 
        icon={<FiCalendar className="text-yellow-500" />} 
      />
      <MetricCard 
        title="Revenue" 
        value="$0" 
        icon={<FiDollarSign className="text-purple-500" />} 
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-3">
          <ActivityItem time="Today, 10:30 AM" action="New user registered" />
          <ActivityItem time="Today, 09:15 AM" action="Project 'Website Redesign' updated" />
          <ActivityItem time="Yesterday, 03:45 PM" action="Task 'Database Migration' completed" />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Add New User</button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Create Project</button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded">Generate Report</button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded">System Settings</button>
        </div>
      </div>
    </div>

    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Project Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Due Date</th>
              <th className="text-left p-2">Team</th>
            </tr>
          </thead>
          <tbody>
            <TableRow 
              name="Website Redesign" 
              status="In Progress" 
              dueDate="2023-12-15" 
              team="5 members" 
            />
            <TableRow 
              name="Mobile App Development" 
              status="Planning" 
              dueDate="2024-01-20" 
              team="3 members" 
            />
            <TableRow 
              name="CRM System Update" 
              status="Completed" 
              dueDate="2023-11-30" 
              team="8 members" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">User Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Users</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserRow 
              name="Admin User" 
              email="admin@example.com" 
              role="Administrator" 
              status="Active" 
            />
            <UserRow 
              name="Manager User" 
              email="manager@example.com" 
              role="Manager" 
              status="Active" 
            />
            <UserRow 
              name="Employee User" 
              email="employee@example.com" 
              role="Employee" 
              status="Inactive" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ProjectManagement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Project Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Projects</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Project Name</th>
              <th className="text-left p-2">Client</th>
              <th className="text-left p-2">Start Date</th>
              <th className="text-left p-2">End Date</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <ProjectRow 
              name="Website Redesign" 
              client="ABC Corp" 
              startDate="2023-11-01" 
              endDate="2023-12-15" 
              status="In Progress" 
            />
            <ProjectRow 
              name="Mobile App" 
              client="XYZ Inc" 
              startDate="2023-12-01" 
              endDate="2024-01-20" 
              status="Planning" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TaskManagement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Task Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Tasks</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Task
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Task Name</th>
              <th className="text-left p-2">Project</th>
              <th className="text-left p-2">Assigned To</th>
              <th className="text-left p-2">Due Date</th>
              <th className="text-left p-2">Priority</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <TaskRow 
              name="Design Homepage" 
              project="Website Redesign" 
              assignedTo="John Doe" 
              dueDate="2023-11-15" 
              priority="High" 
              status="In Progress" 
            />
            <TaskRow 
              name="API Development" 
              project="Mobile App" 
              assignedTo="Jane Smith" 
              dueDate="2023-12-01" 
              priority="Medium" 
              status="Not Started" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CustomerManagement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">All Customers</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Company</th>
              <th className="text-left p-2">Contact Person</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Value</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <CustomerRow 
              company="ABC Corp" 
              contact="John Smith" 
              email="john@abccorp.com" 
              phone="(123) 456-7890" 
              value="$50,000" 
            />
            <CustomerRow 
              company="XYZ Inc" 
              contact="Sarah Johnson" 
              email="sarah@xyzinc.com" 
              phone="(987) 654-3210" 
              value="$25,000" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const InventoryManagement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Inventory Items</h2>
        <div className="space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Item
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Item Code</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Category</th>
              <th className="text-left p-2">Quantity</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <InventoryRow 
              code="ITM-001" 
              name="Laptop" 
              category="Electronics" 
              quantity="15" 
              price="$999.99" 
            />
            <InventoryRow 
              code="ITM-002" 
              name="Office Chair" 
              category="Furniture" 
              quantity="25" 
              price="$199.99" 
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ReportsAnalytics = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Sales Report</h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <p>Sales chart will be displayed here</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Project Status</h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <p>Project status chart will be displayed here</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Generate Report</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Report Type</label>
          <select className="w-full p-2 border rounded">
            <option>Sales Report</option>
            <option>Project Report</option>
            <option>Inventory Report</option>
            <option>User Activity Report</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Start Date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-2">End Date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Generate Report
        </button>
      </div>
    </div>
  </div>
);

const SystemSettings = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">System Settings</h1>
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">General Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Company Name</label>
          <input type="text" className="w-full p-2 border rounded" placeholder="Enter company name" />
        </div>
        <div>
          <label className="block mb-2">Timezone</label>
          <select className="w-full p-2 border rounded">
            <option>(UTC) Coordinated Universal Time</option>
            <option>(UTC-05:00) Eastern Time</option>
            <option>(UTC-08:00) Pacific Time</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Default User Role</label>
          <select className="w-full p-2 border rounded">
            <option>Administrator</option>
            <option>Manager</option>
            <option>Employee</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Save Settings
        </button>
      </div>
    </div>
  </div>
);

// Reusable components
const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center">
    <div className="p-3 rounded-full bg-gray-100 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ time, action }) => (
  <div className="flex items-start">
    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
    <div>
      <p className="text-gray-700">{action}</p>
      <p className="text-gray-400 text-sm">{time}</p>
    </div>
  </div>
);

const TableRow = ({ name, status, dueDate, team }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{name}</td>
    <td className="p-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="p-2">{dueDate}</td>
    <td className="p-2">{team}</td>
  </tr>
);

const UserRow = ({ name, email, role, status }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{name}</td>
    <td className="p-2">{email}</td>
    <td className="p-2">{role}</td>
    <td className="p-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="p-2">
      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
      <button className="text-red-500 hover:text-red-700">Delete</button>
    </td>
  </tr>
);

const ProjectRow = ({ name, client, startDate, endDate, status }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{name}</td>
    <td className="p-2">{client}</td>
    <td className="p-2">{startDate}</td>
    <td className="p-2">{endDate}</td>
    <td className="p-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </td>
    <td className="p-2">
      <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
      <button className="text-gray-500 hover:text-gray-700">Edit</button>
    </td>
  </tr>
);

const TaskRow = ({ name, project, assignedTo, dueDate, priority, status }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{name}</td>
    <td className="p-2">{project}</td>
    <td className="p-2">{assignedTo}</td>
    <td className="p-2">{dueDate}</td>
    <td className="p-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        priority === 'High' ? 'bg-red-100 text-red-800' :
        priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
        'bg-green-100 text-green-800'
      }`}>
        {priority}
      </span>
    </td>
    <td className="p-2">
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
        status === 'Not Started' ? 'bg-gray-100 text-gray-800' :
        'bg-green-100 text-green-800'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

const CustomerRow = ({ company, contact, email, phone, value }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{company}</td>
    <td className="p-2">{contact}</td>
    <td className="p-2">{email}</td>
    <td className="p-2">{phone}</td>
    <td className="p-2">{value}</td>
    <td className="p-2">
      <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
      <button className="text-gray-500 hover:text-gray-700">Edit</button>
    </td>
  </tr>
);

const InventoryRow = ({ code, name, category, quantity, price }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="p-2">{code}</td>
    <td className="p-2">{name}</td>
    <td className="p-2">{category}</td>
    <td className="p-2">{quantity}</td>
    <td className="p-2">{price}</td>
    <td className="p-2">
      <button className="text-blue-500 hover:text-blue-700 mr-2">View</button>
      <button className="text-gray-500 hover:text-gray-700">Edit</button>
    </td>
  </tr>
);

export default AdminDashboard;