const express = require('express');
const router = express.Router();

// Simple test route
router.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Clients API working',
    data: { clients: [] }
  });
});

module.exports = router;
