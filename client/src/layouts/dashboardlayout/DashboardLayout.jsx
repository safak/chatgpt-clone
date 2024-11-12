import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { FiHome, FiLogOut, FiMenu, FiSettings, FiUser } from 'react-icons/fi'
import { Outlet, useNavigate} from 'react-router-dom'
import ChatList from '../../components/chatList/ChatList'
import "./dashboardlayout.css"
const DashboardLayout = () => {

  const {userId, isLoaded} = useAuth()
  const navigate = useNavigate();
  useEffect(()=>{
    if(isLoaded && !userId)
    {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate])

  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  if(!isLoaded) return "Loading...";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-white">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-black lg:h-screen p-4 border border-gray-700">
        <ChatList />
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/4 h-screen p-4 bg-black no-scrollbar overflow-y-auto border border-gray-700">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout
