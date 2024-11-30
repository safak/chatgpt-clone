import React from 'react';
import { Link } from 'react-router-dom';  // Import Link here

function ChatList() {
  return (
    <div className="p-2 flex flex-col space-y-4 ">
      <span className="font-bold text-lg">DASHBOARD</span>
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Create a new Chat
      </Link>
      <Link to="/" className="text-blue-600 hover:underline">
        Explore LAMA Model
      </Link>
      <Link to="/" className="text-blue-600 hover:underline">
        Contact Us
      </Link>
      <hr className="opacity-10 mt-2" />
      <Link to="/dashboard" className="font-medium text-white">
        Recent Chat
      </Link>
      <div className="flex flex-col space-y-2">
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
        <Link to="/" className="text-gray-400 hover:underline">
          Chat Title
        </Link>
      </div>
      <hr className="opacity-10 mt-2" />
      <div className="mt-4">
        <Link to="/" className="flex flex-col items-start space-y-1">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="35"
              height="35"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" fill="#00AEEF" />
              <rect
                x="35"
                y="35"
                width="30"
                height="30"
                fill="#FFF"
                transform="rotate(45 50 50)"
              />
            </svg>
            <span className="font-bold text-gray-800">
              Upgrade to Pro Version
            </span>
          </div>
          <span className="text-sm text-gray-600">
            Get unlimited access to all our features
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ChatList;
