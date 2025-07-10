import express from 'express';
import { 
  getAllUsers, 
  createUser, 
  updateUser, 
  deleteUser, 
  getTeamMembers, 
  getUserById,
  getUsersByRole 
} from '../controllers/userController.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const userRouter = express.Router();

// Get all users (Admin and Network Team)
userRouter.get('/', authMiddleware, roleMiddleware(['admin', 'network_team']), getAllUsers);

// Create user
userRouter.post('/', authMiddleware, roleMiddleware(['admin', 'network_team']), createUser);

// Get user by ID
userRouter.get('/:id', authMiddleware, getUserById);

// Update user
userRouter.put('/:id', authMiddleware, roleMiddleware(['admin', 'network_team']), updateUser);

// Delete user
userRouter.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

// Get team members (Project Manager)
userRouter.get('/team/members', authMiddleware, roleMiddleware(['project_manager']), getTeamMembers);

// Get users by role
userRouter.get('/role/:role', authMiddleware, roleMiddleware(['admin', 'network_team']), getUsersByRole);

export default userRouter;