import React from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import { useSidebar } from '../../contexts/SidebarContext';
import { LuHome, LuPlus, LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { TfiReload } from "react-icons/tfi";
import { PiTreeStructureLight } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { SignedIn, UserButton } from '@clerk/clerk-react';

function ChatList() {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Access global state

  return (
    <div className="flex flex-col justify-between max-w-[250px] h-screen overflow-x-hidden text-gray-700"> {/* Reduced the width */}
      {/* Top Section */}
      <div className="">
        {/* Sidebar Toggle Button */}
        <Link  className="flex items-center justify-center p-2 m-2 rounded-md hover:bg-gray-200   hover:text-black"
        onClick={toggleSidebar}>
       
          {isSidebarOpen ? <LuPanelRightOpen /> : <LuPanelLeftOpen />}
        </Link>

        {/* Divider after the topmost icon */}
        <hr className=" border-gray-200 p-0 m-0 " /> {/* Adds the horizontal line with no padding */}

        {/* Icons Section */}
        <div className="flex flex-col items-center space-y-4 mt-4">
          <Link to="/upload" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 bg-white hover:text-black">
            <LuPlus />
          </Link>
          <Link to="/" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <LuHome />
          </Link>
          <Link to="/reload" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <TfiReload />
          </Link>
          <Link to="/structure" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
            <PiTreeStructureLight className="transform rotate-90" />
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 p-2">
        {/* Settings Link */}
        <Link to="/settings" className="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 hover:text-black">
          <CiSettings />
        </Link>

        {/* User Button */}
        <SignedIn>
          <div className="flex justify-center">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}

export default ChatList;
