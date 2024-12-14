import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from "../components/chatlist/ChatList";
import { useSidebar } from "../contexts/SidebarContext"; // Import the context
import authService from '../AserverAuth/auth';

function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status
  const [isUserLoggedOut, setIsUserLoggedOut] = useState(false); // Track logout status
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar(); // Access global state

  const handleLogout = () => {
    setIsUserLoggedOut(true); // Set the state to reflect that the user is logged out
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Only run once when the component mounts

  useEffect(() => {
    if (isUserLoggedOut) {
      navigate('/login'); // Navigate to login page when logged out
    }
  }, [isUserLoggedOut, navigate]); // This effect only runs when the user logs out

  if (isAuthenticated === null) return <div className="text-black">Loading....</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="lg:w-1/8 bg-[#fff4f4] text-gray transition-all duration-300">
        <ChatList onLogout={handleLogout} /> {/* Pass the handleLogout function as a prop */}
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 bg-white text-gray-200 ${isSidebarOpen ? 'ml-1/4' : 'ml-0'} lg:ml-1/4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}>
        <div>
          <Outlet /> {/* Render the child components */}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
