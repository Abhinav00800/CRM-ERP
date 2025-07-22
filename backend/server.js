require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./routes/Project/projectRoutes');
const clientRoutes = require('./routes/Client/clientRoutes');
const userRoutes = require('./routes/User/userRoutes');
const { authenticate } = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,       // Recommended for unique indexes
  useFindAndModify: false     // For Mongoose deprecation warnings
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Project Management API is running...');
});


// Protected routes
app.use('/api/projects', authenticate, projectRoutes);
app.use('/api/clients', authenticate, clientRoutes);
app.use('/api/users', authenticate, userRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});