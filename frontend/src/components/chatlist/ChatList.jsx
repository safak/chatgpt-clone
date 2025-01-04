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

function ChatList() {
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
    localStorage.clear();
    sessionStorage.clear();

    // Reload the entire app
    window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleReload = () => {
    // Clear Redux state (if using Redux Persist, this will clear the store)
    // localStorage.clear();
    sessionStorage.clear();

    // Reload the entire app
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  const iconClasses = "w-4 h-4"; // Reduced size for icons
  const spacingClasses = "p-1.5"; // Adjusted padding for buttons

  return (
    <div className="flex flex-col justify-between max-w-[40px] h-screen overflow-x-hidden text-gray-700">
      {/* Top Section */}
      <div>
        <button
          onClick={toggleSidebar}
          title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          className={`flex items-center justify-center ${spacingClasses} m-2 rounded-md hover:bg-gray-200`}
        >
          {isSidebarOpen ? (
            <LuPanelRightOpen className={iconClasses} />
          ) : (
            <LuPanelLeftOpen className={iconClasses} />
          )}
        </button>

        <hr className="border-gray-200 p-0 m-0" />

        <div className="flex flex-col items-center space-y-3 mt-3">
          <Link
            to="/dashboard/uploadpdf"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 ${
              isActive('/dashboard/uploadpdf') ? 'bg-white' : ''
            }`}
            title="Upload PDF"
          >
            <LuPlus className={iconClasses} />
          </Link>
          <Link
            to="/dashboard/chat"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 ${
              isActive('/dashboard/chat') ? 'bg-white' : ''
            }`}
            title="Chat"
          >
            <BiHomeAlt className={iconClasses} />
          </Link>
          <button
            onClick={handleReload}
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200`}
            title="Reload"
          >
            <TfiReload className={iconClasses} />
          </button>
          <Link
            to="/dashboard/info"
            className={`flex items-center justify-center ${spacingClasses} rounded-md hover:bg-gray-200 ${
              isActive('/dashboard/info') ? 'bg-white' : ''
            }`}
            title="Information"
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
            title="User Avatar"
            className="w-6 h-6 rounded-full"
          />
        )}
        <Link
          to="/dashboard/settings"
          className={`flex items-center justify-center p-2 rounded-md hover:bg-gray-200 ${
            isActive('/dashboard/settings') ? 'bg-white' : ''
          }`}
          title="Settings"
        >
          <CiSettings className="w-6 h-6" />
        </Link>
        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 text-red-500"
        >
          <IoIosLogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default ChatList;
