import axios from 'axios';
import { ApiResponse, User } from '../types';
import { mockLogin, mockRegister } from './mockData';

const API_URL = '/api/auth';

// Mock API functions for development
const useMockApi = true;

export const login = async (
  email: string, 
  password: string
): Promise<ApiResponse<{ user: User; token: string }>> => {
  if (useMockApi) {
    return mockLogin(email, password);
  }
  
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Login failed' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<{ user: User; token: string }>> => {
  if (useMockApi) {
    return mockRegister(username, email, password);
  }
  
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Registration failed' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};