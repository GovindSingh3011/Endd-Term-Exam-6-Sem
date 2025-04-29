import { create } from 'zustand';
import { login as loginAPI, register as registerAPI } from '../api/auth';
import { setAuthToken, isTokenValid, getUserIdFromToken } from '../utils/auth';
import { useToastStore } from './toastStore';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  // Initialize auth state from local storage
  init: () => {
    const token = localStorage.getItem('event_hub_auth_token');
    
    if (token && isTokenValid()) {
      set({
        token,
        isAuthenticated: true,
        // In a real app, we would fetch the user profile here
        user: { id: getUserIdFromToken() }
      });
    }
  },
  
  // Login function
  login: async (email, password) => {
    const response = await loginAPI(email, password);
    
    if (response.success) {
      const { user, token } = response.data;
      
      setAuthToken(token);
      
      set({
        user,
        token,
        isAuthenticated: true
      });
      
      useToastStore.getState().showToast('Login successful', 'success');
      return true;
    } else {
      useToastStore.getState().showToast(response.error, 'error');
      return false;
    }
  },
  
  // Register function
  register: async (username, email, password) => {
    const response = await registerAPI(username, email, password);
    
    if (response.success) {
      const { user, token } = response.data;
      
      setAuthToken(token);
      
      set({
        user,
        token,
        isAuthenticated: true
      });
      
      useToastStore.getState().showToast('Registration successful', 'success');
      return true;
    } else {
      useToastStore.getState().showToast(response.error, 'error');
      return false;
    }
  },
  
  // Logout function
  logout: () => {
    setAuthToken(null);
    
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
    
    useToastStore.getState().showToast('You have been logged out', 'info');
  }
}));

// Initialize auth state when store is first used
useAuthStore.getState().init();