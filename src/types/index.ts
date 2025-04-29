export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  createdBy: string;
  registeredUsers?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
}

export interface EventState {
  events: Event[];
  userEvents: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  fetchUserEvents: () => Promise<void>;
  createEvent: (event: Omit<Event, "id" | "createdBy">) => Promise<boolean>;
  registerForEvent: (eventId: string) => Promise<boolean>;
  cancelRegistration: (eventId: string) => Promise<boolean>;
}

export interface ToastState {
  toast: { message: string; type: "success" | "error" | "info" } | null;
  showToast: (message: string, type: "success" | "error" | "info") => void;
  hideToast: () => void;
}
