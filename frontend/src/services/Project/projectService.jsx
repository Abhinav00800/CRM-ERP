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

export const fetchProjects = async (params = {}) => {
  try {
    const response = await api.get('/projects', { params });
    return response.data.data.projects;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch projects');
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch project');
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create project');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data.data.project;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    await api.delete(`/projects/${projectId}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete project');
  }
};

export const addTimeEntry = async (projectId, timeData) => {
  try {
    const response = await api.post(`/projects/${projectId}/time`, timeData);
    return response.data.data.timeEntry;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add time entry');
  }
};

export const uploadDocument = async (projectId, formData) => {
  try {
    const response = await api.post(
      `/projects/${projectId}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
};

export const addProjectMilestone = async (projectId, milestoneData) => {
  try {
    const response = await api.post(
      `/projects/${projectId}/milestones`,
      milestoneData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add milestone');
  }
};

export const updateProjectMilestone = async (projectId, milestoneId, milestoneData) => {
  try {
    const response = await api.put(
      `/projects/${projectId}/milestones/${milestoneId}`,
      milestoneData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update milestone');
  }
};
