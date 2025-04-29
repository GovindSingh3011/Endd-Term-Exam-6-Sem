import { create } from 'zustand';
import { 
  getEvents as getEventsAPI, 
  getUserEvents as getUserEventsAPI,
  createEvent as createEventAPI,
  registerForEvent as registerForEventAPI,
  cancelRegistration as cancelRegistrationAPI
} from '../api/events';
import { useToastStore } from './toastStore';
import { useAuthStore } from './authStore';

export const useEventStore = create((set, get) => ({
  events: [],
  userEvents: [],
  loading: false,
  error: null,
  
  // Fetch all events
  fetchEvents: async () => {
    set({ loading: true, error: null });
    
    const response = await getEventsAPI();
    
    if (response.success) {
      set({ events: response.data, loading: false });
    } else {
      set({ error: response.error, loading: false });
      useToastStore.getState().showToast(response.error, 'error');
    }
  },
  
  // Fetch events for the current user
  fetchUserEvents: async () => {
    const { user } = useAuthStore.getState();
    
    if (!user) {
      set({ userEvents: [], loading: false });
      return;
    }
    
    set({ loading: true, error: null });
    
    const response = await getUserEventsAPI(user.id);
    
    if (response.success) {
      set({ userEvents: response.data, loading: false });
    } else {
      set({ error: response.error, loading: false });
      useToastStore.getState().showToast(response.error, 'error');
    }
  },
  
  // Create a new event
  createEvent: async (eventData) => {
    const { user } = useAuthStore.getState();
    
    if (!user) {
      useToastStore.getState().showToast('You must be logged in to create an event', 'error');
      return false;
    }
    
    set({ loading: true, error: null });
    
    const response = await createEventAPI(eventData, user.id);
    
    if (response.success) {
      set(state => ({
        events: [...state.events, response.data],
        loading: false
      }));
      
      useToastStore.getState().showToast('Event created successfully', 'success');
      return true;
    } else {
      set({ error: response.error, loading: false });
      useToastStore.getState().showToast(response.error, 'error');
      return false;
    }
  },
  
  // Register for an event
  registerForEvent: async (eventId) => {
    const { user } = useAuthStore.getState();
    
    if (!user) {
      useToastStore.getState().showToast('You must be logged in to register for an event', 'error');
      return false;
    }
    
    set({ loading: true, error: null });
    
    const response = await registerForEventAPI(eventId, user.id);
    
    if (response.success) {
      // Update the events list with the updated event
      set(state => ({
        events: state.events.map(event => 
          event.id === eventId ? response.data : event
        ),
        loading: false
      }));
      
      // Refresh user events
      await get().fetchUserEvents();
      
      useToastStore.getState().showToast('Registration successful', 'success');
      return true;
    } else {
      set({ error: response.error, loading: false });
      useToastStore.getState().showToast(response.error, 'error');
      return false;
    }
  },
  
  // Cancel registration for an event
  cancelRegistration: async (eventId) => {
    const { user } = useAuthStore.getState();
    
    if (!user) {
      useToastStore.getState().showToast('You must be logged in to cancel a registration', 'error');
      return false;
    }
    
    set({ loading: true, error: null });
    
    const response = await cancelRegistrationAPI(eventId, user.id);
    
    if (response.success) {
      // Update the events list with the updated event
      set(state => ({
        events: state.events.map(event => 
          event.id === eventId ? response.data : event
        ),
        loading: false
      }));
      
      // Refresh user events
      await get().fetchUserEvents();
      
      useToastStore.getState().showToast('Registration cancelled', 'success');
      return true;
    } else {
      set({ error: response.error, loading: false });
      useToastStore.getState().showToast(response.error, 'error');
      return false;
    }
  }
}));