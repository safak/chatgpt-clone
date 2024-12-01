import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { HiMenuAlt1, HiX, HiChat } from 'react-icons/hi'; // Icons for sidebar toggle
import { RiChatNewFill } from "react-icons/ri";
import { useSidebar } from '../../contexts/SidebarContext'; // Import the context

function RootLayout() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key');
  }

  const location = useLocation();
  const { isSidebarOpen, toggleSidebar, newChat, toggleNewChat } = useSidebar(); // Access global state

  // Check if the current route requires centering
  const shouldCenterOutlet = ['/home', '/sign-in', '/sign-up'].includes(location.pathname);
  
  const isDashboardPage = location.pathname === '/dashboard';

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div
        className={`min-h-screen max-h-screen w-full  overflow-hidden ${isDashboardPage ? 'bg-gray-800' : 'bg-gradient-to-l from-gray-800 via-black to-gray-900'}`}
      >

        {/* Header */}
        <SignedOut>
         
        <header className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md sticky top-0 z-10">
  {/* Sidebar Toggle Icon (only visible when signed in) */}
  <SignedIn>
    <div
      onClick={toggleSidebar}
      className=" text-gray-500 p-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-200"
      aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"} // Adds dynamic label based on state
    >
      {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt1 size={24} />}
    </div>
    
  </SignedIn>

  <SignedOut>
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
  </SignedOut>

  {/* User Section */}
  <div className="flex items-center space-x-4 ml-auto"> {/* Added ml-auto here */}
    
    <SignedOut>
      <Link to="/sign-in">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg">
          Sign In
        </button>
      </Link>
    </SignedOut>
  </div>
        </header> 
        </SignedOut>



        {/* Main Content */}
        <main
          className={`   ${shouldCenterOutlet ? 'flex justify-center items-center min-h-screen w-full' : ''}`}
        >
          <Outlet />
        </main>

      </div>
    
    </ClerkProvider>
  );
}

export default RootLayout;
