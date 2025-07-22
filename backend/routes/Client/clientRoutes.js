const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/Client/clientController');
const { authenticate, authorize } = require('../../middleware/auth');
const upload = require('../../middleware/upload');

// Protected routes
router.use(authenticate);

// Get all clients
router.get('/', clientController.getAllClients);

// Get single client
router.get('/:id', clientController.getClientById);

// Create client (Admin or Account Manager only)
router.post('/', authorize(['admin', 'accountManager']), clientController.createClient);

// Update client (Admin or Account Manager only)
router.put('/:id', authorize(['admin', 'accountManager']), clientController.updateClient);

// Upload document
router.post('/:id/documents', upload.uploadSingle('file'), clientController.uploadDocument);

// Delete client (Admin only)
router.delete('/:id', authorize(['admin']), clientController.deleteClient);

module.exports = router;