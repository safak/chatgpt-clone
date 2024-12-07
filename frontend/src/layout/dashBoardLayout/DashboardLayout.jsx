import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from '../../components/chatlist/ChatList';
import { useSidebar } from '../../contexts/SidebarContext'; // Import the context

function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Access global state

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate('sign-in');
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return <div className="text-black">Loading....</div>;

  return (
    <div className="flex h-screen  ">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/8 bg-[#fff4f4] text-gray  transition-all duration-300 
        }`}
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
        <div className="">
          <Outlet />
        </div>
      </main>




    </div>
  );
}

export default DashboardLayout;

