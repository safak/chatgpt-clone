import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import { LuPlus, LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { PiTreeStructureLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import authService from '../../AserverAuth/auth';

function ChatList({ onLogout }) { // Receive onLogout as a prop
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []); // Fetch user when the component mounts

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null); // Reset user state
      onLogout(); // Call onLogout from the parent (DashboardLayout)
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between max-w-[250px] h-screen overflow-x-hidden text-gray-700">
      <div>
        <Link className="flex items-center justify-center p-2 m-2 rounded-md hover:bg-gray-200 hover:text-black" onClick={toggleSidebar}>
          {isSidebarOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
        </Link>

        <hr className="border-gray-200 p-0 m-0" />

        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link to="/upload" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 bg-white hover:text-black">
            <LuPlus />
          </Link>
          <Link to="/dashboard/chat" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <BiHomeAlt />
          </Link>
          <Link to="/reload" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <TfiReload />
          </Link>
          <Link to="/structure" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <PiTreeStructureLight className="transform rotate-90" />
          </Link>
        </div>
      </div>

      <div className="space-y-4 p-2">
        <Link to="/settings" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
          <CiSettings />
        </Link>

        {currentUser ? (
          <div className="flex justify-center">
            <div>
              <img src={currentUser.avatar || '/default-avatar.png'} alt="User Avatar" className="w-8 h-8 rounded-full" />
              <button onClick={handleLogout} className="mt-2 text-red-500">Logout</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link to="/login" className="text-blue-500">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
