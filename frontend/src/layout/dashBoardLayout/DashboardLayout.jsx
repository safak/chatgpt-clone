import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from '../../components/chatlist/ChatList';
import { useSidebar } from '../../contexts/SidebarContext'; // Import the context
import authService from '../../services/auth.service'; // Import AuthService

function DashboardLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Access global state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/sign-in'); // Redirect to sign-in if not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/sign-in');
      } finally {
        setIsLoaded(true);
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (!isLoaded) return <div className="text-black">Loading....</div>;

  if (!isAuthenticated) return null; // Avoid rendering the layout if not authenticated

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/8 bg-[#fff4f4] text-gray transition-all duration-300`}
      >
        <ChatList />
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 bg-white text-gray-200 ${
          isSidebarOpen ? 'ml-1/4' : 'ml-0'
        } lg:ml-1/4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
      >
        {/* Main Content */}
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
