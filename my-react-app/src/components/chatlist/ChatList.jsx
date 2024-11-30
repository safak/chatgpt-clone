import React from 'react';
import { Link } from 'react-router-dom';  // Import Link here
import { IoIosSearch } from "react-icons/io";
import { useSidebar } from '../../contexts/SidebarContext';
import { HiChat, HiOutlineMail } from 'react-icons/hi'; // Import icons from react-icons

function ChatList() {
  const { isSidebarOpen, toggleSidebar, newChat, toggleNewChat } = useSidebar(); // Access global state
  return (
    <div className="flex flex-col space-y-4 max-w-full overflow-x-hidden">
      <span className="font-bold text-lg">DASHBOARD</span>

      {/* Search Box */}
      <div className="flex items-center bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 w-full">
        <IoIosSearch size={20} className="text-white" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent text-white placeholder-gray-300 focus:outline-none flex-grow ml-2 w-full"
        />
      </div>

      <div className="space-y-4">
        <Link
          to="/dashboard"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 flex items-center space-x-2"
        >
          <HiChat size={20} />
          <span>Create a new Chat</span>
        </Link>

        <Link
          to="/contact"
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 flex items-center space-x-2"
        >
          <HiOutlineMail size={20} />
          <span>Contact Us</span>
        </Link>

        <hr className="opacity-10 mt-2" />
      </div>

      
      {/* Chat Titles List */}
      <div className="flex flex-col space-y-2 max-h-[30vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Recent Chats */}
    
        <span className='text-gray-300'>Recent</span>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        <Link to="/" className="text-gray-400 hover:underline">Chat Title</Link>
        {/* Repeat for more links */}
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
            <span className="font-bold text-white">
              Upgrade to Pro Version
            </span>
          </div>
          <span className="text-sm text-white">
            Get unlimited access to all our features
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ChatList;
