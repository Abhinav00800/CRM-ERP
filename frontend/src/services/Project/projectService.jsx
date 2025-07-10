import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = import.meta.env.VITE_API_URL + '/auth';


export const fetchProjects = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data.projects;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch projects');
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/${projectId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch project');
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create project');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, projectData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    await axios.delete(`${API_URL}/${projectId}`, {
      headers: getAuthHeader()
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete project');
  }
};

export const uploadDocument = async (projectId, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${projectId}/documents`,
      formData,
      {
        headers: {
          ...getAuthHeader(),
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
    const response = await axios.post(
      `${API_URL}/${projectId}/milestones`,
      milestoneData,
      {
        headers: getAuthHeader()
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add milestone');
  }
};

export const updateProjectMilestone = async (projectId, milestoneId, milestoneData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${projectId}/milestones/${milestoneId}`,
      milestoneData,
      {
        headers: getAuthHeader()
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update milestone');
  }
};
export const uploadProjectDocument = async (projectId, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${projectId}/documents`,
      formData,
      {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
};