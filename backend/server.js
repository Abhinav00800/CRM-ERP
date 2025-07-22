// Import express
const express = require('express');

// Create an express app
const app = express();

// Set a port number
const PORT = process.env.PORT || 3000;

// Middleware (optional) — parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
