import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const user = getCurrentUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchUsers = async (params = {}) => {
  try {
    const response = await api.get('/employees', { params });
    return response.data.data?.users || [];
  } catch (error) {
    // Return mock data for now since employees route is not fully implemented
    return [
      { _id: '1', firstName: 'John', lastName: 'Doe', role: 'projectManager', email: 'john@example.com' },
      { _id: '2', firstName: 'Jane', lastName: 'Smith', role: 'developer', email: 'jane@example.com' },
      { _id: '3', firstName: 'Mike', lastName: 'Johnson', role: 'projectManager', email: 'mike@example.com' },
      { _id: '4', firstName: 'Sarah', lastName: 'Williams', role: 'developer', email: 'sarah@example.com' },
      { _id: '5', firstName: 'Emma', lastName: 'Davis', role: 'designer', email: 'emma@example.com' },
    ];
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/employees/${userId}`);
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user');
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create user');
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/employees/${userId}`, userData);
    return response.data.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user');
  }
};

export const deleteUser = async (userId) => {
  try {
    await api.delete(`/employees/${userId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};
