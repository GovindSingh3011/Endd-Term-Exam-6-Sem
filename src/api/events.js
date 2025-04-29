import axios from 'axios';
import { mockCreateEvent, mockGetEvents, mockGetUserEvents, mockRegisterForEvent, mockCancelRegistration } from './mockData';
import { getAuthToken } from '../utils/auth';

const API_URL = '/api/events';

// Mock API functions for development
const useMockApi = true;

// Get all events
export const getEvents = async () => {
  if (useMockApi) {
    return mockGetEvents();
  }
  
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Failed to fetch events' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Get events registered by a user
export const getUserEvents = async (userId) => {
  if (useMockApi) {
    return mockGetUserEvents(userId);
  }
  
  try {
    const token = getAuthToken();
    const response = await axios.get(`/api/users/${userId}/events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Failed to fetch user events' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Create a new event
export const createEvent = async (eventData, userId) => {
  if (useMockApi) {
    return mockCreateEvent(eventData, userId);
  }
  
  try {
    const token = getAuthToken();
    const response = await axios.post(API_URL, eventData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Failed to create event' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Register for an event
export const registerForEvent = async (eventId, userId) => {
  if (useMockApi) {
    return mockRegisterForEvent(eventId, userId);
  }
  
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/${eventId}/register`, { userId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Failed to register for event' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Cancel registration for an event
export const cancelRegistration = async (eventId, userId) => {
  if (useMockApi) {
    return mockCancelRegistration(eventId, userId);
  }
  
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/${eventId}/cancel/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data.error || 'Failed to cancel registration' };
    }
    return { success: false, error: 'Network error. Please try again.' };
  }
};