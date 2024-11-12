import React from 'react'
import './chatlist.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const chatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChat"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  return (
    <div className="flex flex-col h-full p-4">
    {/* Create new chat link */}
    <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-700 transition duration-200">
      Create a new Chat
    </Link>
  
    {/* Divider */}
    <hr className="border-none h-1 bg-gray-600 opacity-25 my-4 rounded" />
  
    {/* Recent Chats Section */}
    <span className="font-semibold text-xs mb-2">RECENT CHATS</span>
  
    {/* Scrollable chat list */}
    <div className="flex flex-col mb-4 space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
      {isPending
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data?.map((chat) => (
            <Link
              to={`/dashboard/chats/${chat._id}`}
              key={chat._id}
              className="p-2 rounded-lg hover:bg-gray-700 transition duration-200 text-gray-200 bg-gray-800"
            >
              {chat.title}
            </Link>
          ))}
    </div>
  
    {/* Divider */}
    <hr className="border-none h-1 bg-gray-600 opacity-25 my-4 rounded" />
  
    {/* Upgrade section */}
    <div className="flex items-center gap-2 mt-auto">
      <img src="/logo.png" alt="Upgrade Logo" className="w-6 h-6" />
      <div className="flex flex-col text-xs">
        <span className="font-semibold">Upgrade to Cleo AI Pro</span>
        <span className="text-gray-400">Get unlimited access to all features</span>
      </div>
    </div>
  </div>
  )
}

export default chatList
