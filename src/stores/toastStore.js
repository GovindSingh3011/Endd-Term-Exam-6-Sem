import { create } from 'zustand';

export const useToastStore = create((set) => ({
  toast: null,
  
  // Show a toast message
  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    
    // Hide the toast after 3 seconds
    setTimeout(() => {
      set(state => {
        // Only clear if it's the same toast
        if (state.toast && state.toast.message === message) {
          return { toast: null };
        }
        return state;
      });
    }, 3000);
  },
  
  // Hide the toast message
  hideToast: () => set({ toast: null })
}));