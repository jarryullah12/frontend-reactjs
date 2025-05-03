import React, { useState, useEffect } from 'react';

const Notification = ({ type = 'info', message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`fixed top-5 right-5 z-50 p-4 rounded-md border ${getTypeStyles()} shadow-md max-w-md`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-lg">{getIcon()}</span>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-auto -mx-1.5 -my-1.5 rounded-md p-1.5 hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none"
        >
          <span className="sr-only">Close</span>
          <span className="text-lg">×</span>
        </button>
      </div>
    </div>
  );
};

export default Notification;
