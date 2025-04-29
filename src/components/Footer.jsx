import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <CalendarDays className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">EventHub</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/events" className="hover:text-blue-300 transition-colors duration-200">
              Events
            </Link>
            <Link to="/create-event" className="hover:text-blue-300 transition-colors duration-200">
              Create Event
            </Link>
            <Link to="/my-events" className="hover:text-blue-300 transition-colors duration-200">
              My Events
            </Link>
          </div>
        </div>
        
        <hr className="border-gray-700 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;