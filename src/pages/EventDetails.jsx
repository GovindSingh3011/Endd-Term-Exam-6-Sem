import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';
import { format } from 'date-fns';
import { Calendar, Users, Clock, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, fetchEvents, registerForEvent, cancelRegistration } = useEventStore();
  const { user, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  
  useEffect(() => {
    const loadEvent = async () => {
      if (events.length === 0) {
        await fetchEvents();
      }
      
      setLoading(false);
    };
    
    loadEvent();
  }, [fetchEvents, events]);
  
  useEffect(() => {
    if (!loading) {
      const foundEvent = events.find(e => e.id === id);
      setEvent(foundEvent);
      
      if (!foundEvent) {
        navigate('/events', { replace: true });
      }
    }
  }, [id, events, loading, navigate]);
  
  if (loading || !event) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  const { title, description, date, registeredUsers = [] } = event;
  const isRegistered = user && registeredUsers.includes(user.id);
  const isPastEvent = new Date(date) < new Date();
  const attendeeCount = registeredUsers.length;
  
  const handleRegister = async () => {
    await registerForEvent(id);
  };
  
  const handleCancel = async () => {
    await cancelRegistration(id);
  };
  
  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to events
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-6 px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
          <div className="flex flex-wrap items-center mt-4 text-blue-100">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{format(new Date(date), 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 mr-2" />
              <span>{attendeeCount} {attendeeCount === 1 ? 'attendee' : 'attendees'}</span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About this event</h2>
          <p className="text-gray-600 whitespace-pre-line">{description}</p>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            {isAuthenticated ? (
              !isPastEvent ? (
                isRegistered ? (
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1 sm:mr-4">
                      <div className="bg-green-50 text-green-800 rounded-md py-3 px-4 mb-4 sm:mb-0">
                        <p className="font-medium">You're registered for this event!</p>
                      </div>
                    </div>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Cancel Registration
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRegister}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Register for this Event
                  </button>
                )
              ) : (
                <div className="bg-gray-100 text-gray-600 rounded-md py-3 px-4">
                  <p className="font-medium">This event has already taken place</p>
                </div>
              )
            ) : (
              <div className="bg-blue-50 text-blue-800 rounded-md py-3 px-4">
                <p className="font-medium">
                  Please{' '}
                  <a href="/login" className="underline hover:text-blue-900">
                    log in
                  </a>{' '}
                  to register for this event
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;