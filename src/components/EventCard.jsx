import React from 'react';
import { Link } from 'react-router-dom';
import { format, isPast } from 'date-fns';
import { Calendar, Users, MapPin } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useEventStore } from '../stores/eventStore';

const EventCard = ({ event, showActions = true }) => {
  const { id, title, description, date, registeredUsers = [] } = event;
  const { user, isAuthenticated } = useAuthStore();
  const { registerForEvent, cancelRegistration } = useEventStore();
  
  const isRegistered = user && registeredUsers.includes(user.id);
  const isPastEvent = isPast(new Date(date));
  const attendeeCount = registeredUsers.length;
  
  const handleRegister = async (e) => {
    e.preventDefault();
    await registerForEvent(id);
  };
  
  const handleCancel = async (e) => {
    e.preventDefault();
    await cancelRegistration(id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            <Link to={`/events/${id}`}>{title}</Link>
          </h2>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isPastEvent ? 'bg-gray-200 text-gray-600' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {isPastEvent ? 'Past' : 'Upcoming'}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600 line-clamp-2">{description}</p>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{format(new Date(date), 'MMMM d, yyyy')}</span>
          <span className="mx-2">•</span>
          <Users className="h-4 w-4 mr-1" />
          <span>{attendeeCount} {attendeeCount === 1 ? 'attendee' : 'attendees'}</span>
        </div>
        
        {showActions && isAuthenticated && !isPastEvent && (
          <div className="mt-5 flex justify-end">
            {isRegistered ? (
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel Registration
              </button>
            ) : (
              <button
                onClick={handleRegister}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Register
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;