import React, { useEffect, useState } from 'react';
import { useToastStore } from '../stores/toastStore';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';

const Toast = () => {
  const { toast, hideToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (toast) {
      setIsVisible(true);
    }
  }, [toast]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => hideToast(), 300); // Wait for animation to finish
  };
  
  if (!toast) return null;
  
  const { message, type } = toast;
  
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className={`fixed bottom-4 right-4 z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <div className={`rounded-lg shadow-lg border px-4 py-3 flex items-center ${getToastStyles()}`}>
        <div className="mr-3">{getIcon()}</div>
        <p className="mr-6">{message}</p>
        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;