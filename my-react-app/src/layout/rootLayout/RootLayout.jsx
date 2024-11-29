import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="p-4">
      <header className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-md">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
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
          <span className="font-bold text-lg text-gray-800">chatbot</span>
        </Link>

        {/* User Section */}
        <div className="text-pink-800 font-medium">User</div>
      </header>

      {/* Main Content */}
      <main className="flex mt-4 space-x-4">
        {/* Sample children aligned horizontally */}
        <div className="bg-blue-200 p-4 rounded-md shadow-md flex-1">Child 1</div>
        <div className="bg-gray-200 p-4 rounded-md shadow-md flex-1">Child 2</div>
        <div className="bg-gray-200 p-4 rounded-md shadow-md flex-1">Child 3</div>
      </main>
    </div>
  );
}

export default RootLayout;
