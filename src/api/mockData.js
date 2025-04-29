import { format } from 'date-fns';

// Mock user data
const users = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    password: 'password123'
  }
];

// Mock events data
const events = [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description: 'A conference about the latest technology trends and innovations.',
    date: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    createdBy: '1',
    registeredUsers: ['2']
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    description: 'Learn the basics of web development in this hands-on workshop.',
    date: format(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    createdBy: '2',
    registeredUsers: ['1']
  },
  {
    id: '3',
    title: 'Startup Networking Event',
    description: 'Connect with other entrepreneurs and startup founders.',
    date: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    createdBy: '1',
    registeredUsers: []
  }
];

// Mock login function
export const mockLogin = (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve({
          success: true,
          data: {
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + userWithoutPassword.id
          }
        });
      } else {
        resolve({
          success: false,
          error: 'Invalid email or password'
        });
      }
    }, 500);
  });
};

// Mock register function
export const mockRegister = (username, email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingUser = users.find(user => user.email === email);
      
      if (existingUser) {
        resolve({
          success: false,
          error: 'Email already in use'
        });
      } else {
        const newUser = {
          id: (users.length + 1).toString(),
          username,
          email,
          password
        };
        
        users.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        resolve({
          success: true,
          data: {
            user: userWithoutPassword,
            token: 'mock-jwt-token-' + userWithoutPassword.id
          }
        });
      }
    }, 500);
  });
};

// Mock get events function
export const mockGetEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: events
      });
    }, 500);
  });
};

// Mock get user events function
export const mockGetUserEvents = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userEvents = events.filter(event => 
        event.registeredUsers.includes(userId) || event.createdBy === userId
      );
      
      resolve({
        success: true,
        data: userEvents
      });
    }, 500);
  });
};

// Mock create event function
export const mockCreateEvent = (eventData, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEvent = {
        id: (events.length + 1).toString(),
        ...eventData,
        createdBy: userId,
        registeredUsers: []
      };
      
      events.push(newEvent);
      
      resolve({
        success: true,
        data: newEvent
      });
    }, 500);
  });
};

// Mock register for event function
export const mockRegisterForEvent = (eventId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = events.find(e => e.id === eventId);
      
      if (!event) {
        resolve({
          success: false,
          error: 'Event not found'
        });
        return;
      }
      
      if (event.registeredUsers.includes(userId)) {
        resolve({
          success: false,
          error: 'User already registered for this event'
        });
        return;
      }
      
      event.registeredUsers.push(userId);
      
      resolve({
        success: true,
        data: event
      });
    }, 500);
  });
};

// Mock cancel registration function
export const mockCancelRegistration = (eventId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const event = events.find(e => e.id === eventId);
      
      if (!event) {
        resolve({
          success: false,
          error: 'Event not found'
        });
        return;
      }
      
      const userIndex = event.registeredUsers.indexOf(userId);
      
      if (userIndex === -1) {
        resolve({
          success: false,
          error: 'User not registered for this event'
        });
        return;
      }
      
      event.registeredUsers.splice(userIndex, 1);
      
      resolve({
        success: true,
        data: event
      });
    }, 500);
  });
};