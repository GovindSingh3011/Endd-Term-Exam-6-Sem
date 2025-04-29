import React, { useEffect, useState } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';
import EventCard from '../components/EventCard';
import { UserCheck, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isPast } from 'date-fns';

const MyEvents = () => {
  const { userEvents, loading, fetchUserEvents } = useEventStore();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('registered');
  
  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [fetchUserEvents, user]);
  
  // Filter events based on the active tab
  const getFilteredEvents = () => {
    if (!userEvents.length) return [];
    
    switch (activeTab) {
      case 'registered':
        return userEvents.filter(event => 
          event.registeredUsers.includes(user.id) && 
          !isPast(new Date(event.date))
        );
      case 'created':
        return userEvents.filter(event => 
          event.createdBy === user.id
        );
      case 'past':
        return userEvents.filter(event => 
          event.registeredUsers.includes(user.id) && 
          isPast(new Date(event.date))
        );
      default:
        return userEvents;
    }
  };
  
  const filteredEvents = getFilteredEvents();
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
          <p className="text-gray-600 mt-1">Manage your events and registrations</p>
        </div>
        
        <Link 
          to="/create-event"
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Create Event
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button 
              onClick={() => setActiveTab('registered')}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === 'registered' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Registrations
            </button>
            <button 
              onClick={() => setActiveTab('created')}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === 'created' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Created by Me
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 px-4 text-center font-medium text-sm focus:outline-none ${
                activeTab === 'past' 
                  ? 'border-b-2 border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
            {activeTab === 'registered' || activeTab === 'past' ? (
              <UserCheck className="h-8 w-8" />
            ) : (
              <Calendar className="h-8 w-8" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            {activeTab === 'registered' && 'No upcoming registrations'}
            {activeTab === 'created' && 'You haven\'t created any events yet'}
            {activeTab === 'past' && 'No past events'}
          </h3>
          <p className="mt-2 text-gray-500">
            {activeTab === 'registered' && 'Browse events and register to see them here'}
            {activeTab === 'created' && 'Create your first event to get started'}
            {activeTab === 'past' && 'Events you\'ve attended will appear here'}
          </p>
          <div className="mt-6">
            {activeTab === 'registered' || activeTab === 'past' ? (
              <Link 
                to="/events"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Browse events
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            ) : (
              <Link 
                to="/create-event"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create an event
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;