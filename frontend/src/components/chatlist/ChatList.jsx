import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import { LuPlus, LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { BiHomeAlt } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { PiTreeStructureLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import authService from '../../AserverAuth/auth';

function ChatList({ onLogout }) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

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
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setCurrentUser(null);
      onLogout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const iconClasses = "w-5 h-5"; // Smaller size for icons
  const spacingClasses = "p-1.5"; // Adjust padding for smaller icons

  return (
    <div className="flex flex-col justify-between max-w-[200px] h-screen overflow-x-hidden text-gray-700">
      {/* Top Section */}
      <div>
        <Link
          className={`flex items-center justify-center ${spacingClasses} m-2 rounded-md hover:bg-gray-200 hover:text-black`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <LuPanelRightOpen className={iconClasses} />
          ) : (
            <LuPanelLeftOpen className={iconClasses} />
          )}
        </Link>

        <hr className="border-gray-200 p-0 m-0" />

        <div className="flex flex-col items-center space-y-3 mt-3">
          <Link
            to="/dashboard/uploadpdf"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 hover:text-black ${
              isActive('/dashboard/uploadpdf') ? 'bg-white' : ''
            }`}
          >
            <LuPlus className={iconClasses} />
          </Link>
          <Link
            to="/dashboard/chat"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 hover:text-black ${
              isActive('/dashboard/chat') ? 'bg-white' : ''
            }`}
          >
            <BiHomeAlt className={iconClasses} />
          </Link>
          <Link
            to="/"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 hover:text-black ${
              isActive('/') ? 'bg-white' : ''
            }`}
          >
            <TfiReload className={iconClasses} />
          </Link>
          <Link
            to="/dashboard/info"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 hover:text-black ${
              isActive('/dashboard/info') ? 'bg-white' : ''
            }`}
          >
            <PiTreeStructureLight className={`${iconClasses} transform rotate-90`} />
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center space-y-3 pb-3">
        {currentUser && (
          <img
            src={currentUser.avatar || '/default-avatar.png'}
            alt="User Avatar"
            className={`${iconClasses} rounded-full`} // Same size as icons
          />
        )}
        <Link
          to="/dashboard/settings"
          className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 hover:text-black ${
            isActive('/dashboard/settings') ? 'bg-white' : ''
          }`}
        >
          <CiSettings className={iconClasses} />
        </Link>
        <button
          onClick={handleLogout}
          className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 text-red-500`}
        >
          <IoIosLogOut className={iconClasses} />
        </button>
      </div>
    </div>
  );
}

export default ChatList;
