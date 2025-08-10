const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
// const authRoutes = require('./routes/authRouter');
const clientRoutes = require('./routes/clients');
// const projectRoutes = require('./routes/projects');
const financeRoutes = require('./routes/finance');
const employeeRoutes = require('./routes/employees');
const reportRoutes = require('./routes/reports');
const notificationRoutes = require('./routes/notifications');
const projectRouter = require('./routes/projects');
const authRouter = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  // Removed deprecated options that are no longer needed in newer MongoDB driver versions
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRouter); //done
app.use('/api/clients', clientRoutes); 
app.use('/api/project', authenticateToken, projectRouter); // done
app.use("/api/finance",financeRoutes);// done
app.use('/api/employees', employeeRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CRM-ERP Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 CRM-ERP Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
