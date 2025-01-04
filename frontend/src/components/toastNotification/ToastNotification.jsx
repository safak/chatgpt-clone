import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md'; // Close icon

const ToastNotification = ({ message, duration, onClose, position = 'right', isSuccess = true }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false); // Hide the notification after the duration
        onClose && onClose(); // Call the onClose prop when it disappears
      }, duration);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [duration, onClose]);

  if (!show) return null; // Don't render if show is false

  const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const ringColor = isSuccess ? 'ring-green-300' : 'ring-red-300';
  const shadowColor = isSuccess ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)';

  return (
    <div
      className={`fixed top-4 ${position === 'right' ? 'right-4' : 'left-4'} 
        ${bgColor} bg-opacity-80 text-white p-2 rounded-lg shadow-lg flex items-center space-x-4 
        w-90 max-w-full transition-all transform ${show ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'} 
        ease-out duration-500
        ring-2 ${ringColor} ring-opacity-40 ring-offset-2 
        backdrop-blur-sm hover:backdrop-blur-md`}
      style={{
        opacity: show ? 1 : 0,
        boxShadow: `0 4px 10px ${shadowColor}, 0 0 20px ${shadowColor}`,
      }}
    >
      <span className="text-lg font-semibold">{message}</span>
      <button
        onClick={() => {
          setShow(false); // Hide the notification immediately on close
          onClose && onClose(); // Call onClose if provided
        }}
        className="ml-auto text-white p-2 bg-transparent hover:bg-opacity-80 rounded-full focus:outline-none"
      >
        <MdClose size={20} />
      </button>
    </div>
  );
};

ToastNotification.defaultProps = {
  message: 'Default message',  // Default message to show
  duration: 3000,  // Default duration is 3 seconds
  onClose: () => {},  // Default no-op function for onClose
  position: 'right',  // Default position to 'right'
  isSuccess: true, // Default to success (green)
};

export default ToastNotification;
