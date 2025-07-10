import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = import.meta.env.VITE_API_URL + '/auth';


export const fetchClients = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch clients');
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}/${clientId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch client');
  }
};

export const createClient = async (clientData) => {
  try {
    const response = await axios.post(API_URL, clientData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create client');
  }
};

export const updateClient = async (clientId, clientData) => {
  try {
    const response = await axios.put(`${API_URL}/${clientId}`, clientData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update client');
  }
};

export const deleteClient = async (clientId) => {
  try {
    await axios.delete(`${API_URL}/${clientId}`, {
      headers: getAuthHeader()
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete client');
  }
};

export const uploadClientDocument = async (clientId, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/${clientId}/documents`,
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