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
    <div className="flex h-screen  relative ">
      {/* Sidebar */}
      <aside
        className={`lg:w-1/4 bg-gray-800 text-white p-4 transition-all duration-300 rounded-xl ${
          isSidebarOpen ? 'block' : 'hidden '
        }`}
      >
        <ChatList />
      </aside>


      {/* Main Content Area */}
      <main
  className={`flex-1 bg-[#12101b] p-6 text-white  ${
    isSidebarOpen ? 'ml-1/4' : 'ml-0'
  } lg:ml-1/4 overflow-y-auto scrollbar `}
>
  {/* Main Content */}
  <Outlet />
</main>



    </div>
  );
}

export default DashboardLayout;
