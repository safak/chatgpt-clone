import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from "../components/chatlist/ChatList";
import { useSidebar } from "../contexts/SidebarContext"; // Import the context
import authService from '../AserverAuth/auth';

function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // To track authentication status
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Access global state

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to the sign-in page if not authenticated
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (isAuthenticated === null) return <div className="text-black">Loading....</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/8 bg-[#fff4f4] text-gray  transition-all duration-300`}
      >
        <ChatList />
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 bg-white text-gray-200 ${isSidebarOpen ? 'ml-1/4' : 'ml-0'} lg:ml-1/4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
      >
        {/* Main Content - Rendering the child components */}
        <div className="">
          <Outlet /> {/* Renders the child routes/components */}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
