import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays, Menu, X, LogIn, UserPlus, LogOut, Plus, Calendar } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <CalendarDays className="h-6 w-6" />
            <span>Eventra</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="hover:text-blue-200 transition-colors duration-200">
              Events
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/my-events" className="hover:text-blue-200 transition-colors duration-200">
                  My Events
                </Link>
                <Link 
                  to="/create-event" 
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Event</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center px-4 py-2 rounded-md bg-white text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden text-white">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 pb-6 animate-fadeIn">
            <Link 
              to="/events" 
              className="block hover:text-blue-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2 py-2">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-events" 
                  className="block hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <CalendarDays className="h-5 w-5" />
                    <span>My Events</span>
                  </div>
                </Link>
                <Link 
                  to="/create-event" 
                  className="block hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <Plus className="h-5 w-5" />
                    <span>Create Event</span>
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 py-2 w-full text-left hover:text-blue-200 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </div>
                </Link>
                <Link 
                  to="/register" 
                  className="block hover:text-blue-200 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2 py-2">
                    <UserPlus className="h-5 w-5" />
                    <span>Register</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;