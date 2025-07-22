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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchClients = async (params = {}) => {
  try {
    const response = await api.get('/clients', { params });
    return response.data.data.clients;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch clients');
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}`);
    return response.data.data.client;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client');
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData);
    return response.data.data.client;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create client');
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await api.put(`/clients/${clientId}`, clientData);
    return response.data.data.client;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update client');
  }
};

export const deleteClient = async (clientId) => {
  try {
    await api.delete(`/clients/${clientId}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete client');
  }
};

export const getClientProjects = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/projects`);
    return response.data.data.projects;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client projects');
  }
};

export const getClientInvoices = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/invoices`);
    return response.data.data.invoices;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client invoices');
  }
};

export const getClientPayments = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/payments`);
    return response.data.data.payments;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client payments');
  }
};

export const updateClientStatus = async (clientId, status) => {
  try {
    const response = await api.patch(`/clients/${clientId}/status`, { status });
    return response.data.data.client;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update client status');
  }
};

export const getClientAnalytics = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/analytics`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client analytics');
  }
};

export const searchClients = async (query) => {
  try {
    const response = await api.get(`/clients/search?q=${encodeURIComponent(query)}`);
    return response.data.data.clients;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search clients');
  }
};

export const exportClients = async (format = 'csv') => {
  try {
    const response = await api.get(`/clients/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to export clients');
  }
};

export const uploadClientDocument = async (clientId, formData) => {
  try {
    const response = await api.post(`/clients/${clientId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data.document;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
};