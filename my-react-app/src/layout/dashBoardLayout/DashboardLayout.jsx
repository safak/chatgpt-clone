import React, { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChatList from '../../components/chatlist/ChatList';
import { HiMenuAlt1, HiX } from 'react-icons/hi'; // Icons for sidebar toggle
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

  if (!isLoaded) return <div className="text-white">Loading....</div>;

  return (
    <div className="flex h-screen  mt-2 ">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/8 bg-gray-800 text-white p-4 transition-all duration-300 rounded-xl ${
          isSidebarOpen ? 'block' : 'hidden '
        }`}
      >
        <ChatList />
      </aside>


      {/* Main Content Area */}
      <main
        className={`flex-1 bg-[#12101b] p-16 text-white relative rounded-xl ${
          isSidebarOpen ? 'ml-1/4' : 'ml-0'
        } lg:ml-1/4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-pattern-dots opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: `20px 20px`,
            backgroundPosition: `center center`,
            transform: `rotate(45deg)`,
          }}
        ></div>

        {/* Main Content */}
        <div className="">
          <Outlet />
        </div>
      </main>




    </div>
  );
}

export default DashboardLayout;
