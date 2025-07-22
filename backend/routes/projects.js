const express = require('express');
const router = express.Router();

// Simple test route
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Projects API working',
    data: { projects: [] }
  });
});

module.exports = router;
