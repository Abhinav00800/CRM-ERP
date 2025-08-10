import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProjectManagement from './pages/ProjectManagement';
import StaffDashboard from './pages/StaffManagment';
import ProjectManagerDashboard from './pages/LeadManagment';
import ClientRequestPage from './pages/ClientManagment';
import AdminDashboard from './pages/AdminManagment';
import ClientDashboard from './pages/client-dashboard/ClientDashboard';
import { ProjectProvider } from './context/ProjectContext';

// Temporary placeholder components for other dashboards
const Sales = () => <h1>Sales Dashboard</h1>;
const Finance = () => <h1>Finance Dashboard</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path='/' element={<LandingPage />} />

        {/* Login & Signup routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        {/* Role-based dashboards */}
        <Route path='/project-manager' element={<ProjectManagerDashboard />} />
        {/* <Route path='/hr' element={<HR />} /> */}
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/client' element={<ProjectProvider> <ClientDashboard /> </ProjectProvider>} />
        <Route path='/sales' element={<Sales />} />
        <Route path='/finance' element={<Finance />} />
        <Route path='/projectmanagment' element={<ProjectManagement/>} />
        <Route path='/staffmanagment' element={<StaffDashboard/>} />
        <Route path='/leadmanagment' element={<ProjectManagerDashboard/>} />
        <Route path='/clientmanagment' element={<ClientRequestPage/>} />
        <Route path='/adminmanagment' element={<AdminDashboard/>} />
        <Route path='/projectmanagement/:id' element={<ProjectManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
