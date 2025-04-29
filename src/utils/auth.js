import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'event_hub_auth_token';

// Get token from local storage
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Set token in local storage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

// Check if token is valid (not expired)
export const isTokenValid = () => {
  const token = getAuthToken();
  
  if (!token) {
    return false;
  }
  
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Get user ID from token
export const getUserIdFromToken = () => {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.id;
  } catch (error) {
    return null;
  }
};