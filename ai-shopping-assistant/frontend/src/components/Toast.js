import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { error, clearError } = useApp();
  const [toasts, setToasts] = useState([]);

  // Add error toast when error changes
  useEffect(() => {
    if (error) {
      const id = Date.now();
      setToasts(prev => [...prev, {
        id,
        type: 'error',
        message: error,
        duration: 5000
      }]);
      
      // Auto remove after duration
      setTimeout(() => {
        removeToast(id);
      }, 5000);
      
      clearError();
    }
  }, [error, clearError]);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.3 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
            className={`max-w-sm p-4 rounded-lg shadow-lg border ${getToastStyles(toast.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getToastIcon(toast.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 flex-shrink-0 rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Export a function to programmatically show toasts
export const showToast = (message, type = 'info', duration = 3000) => {
  const event = new CustomEvent('showToast', {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export default Toast;