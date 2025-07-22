const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/User/userController'); // Ensure this path is correct
const { authenticate, authorize } = require('../../middleware/auth');

// Make sure all these controller functions exist in userController.js
router.route('/')
  .get(authenticate, authorize('admin'), getUsers) // Must be a function
  .post(authenticate, authorize('admin'), createUser); // Must be a function

router.route('/:id')
  .get(authenticate, getUser) // Must be a function
  .put(authenticate, authorize('admin'), updateUser) // Must be a function
  .delete(authenticate, authorize('admin'), deleteUser); // Must be a function

module.exports = router;