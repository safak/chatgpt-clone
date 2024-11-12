import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChat"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };
  return (
    <div className="flex flex-col p-8 bg-black h-full items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center justify-center mb-6">
      <img src="/logo.png" alt="LAMA AI Logo" className="w-16 h-16 mr-3" />
      <h1 style={{
    background: 'linear-gradient(to right, #217bfe, #e55571)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  }} className="text-4xl font-bold">CLEO AI</h1>
    </div>
    
    {/* Options Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
      <div className="flex flex-col items-center bg-gray-800 p-5 rounded-lg hover:bg-gray-700 transition-shadow shadow-md hover:shadow-lg">
        <img src="/chat.png" alt="Create a New Chat" className="w-10 h-10 mb-2" />
        <span className="text-lg font-semibold text-white">Create a New Chat</span>
      </div>
      <div className="flex flex-col items-center bg-gray-800 p-5 rounded-lg hover:bg-gray-700 transition-shadow shadow-md hover:shadow-lg">
        <img src="/image.png" alt="Analyze Images" className="w-10 h-10 mb-2" />
        <span className="text-lg font-semibold text-white">Analyze Images</span>
      </div>
      <div className="flex flex-col items-center bg-gray-800 p-5 rounded-lg hover:bg-gray-700 transition-shadow shadow-md hover:shadow-lg">
        <img src="/code.png" alt="Help me with my Code" className="w-10 h-10 mb-2" />
        <span className="text-lg font-semibold text-white">Help me with my Code</span>
      </div>
    </div>

    {/* Input Form */}
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
      <form className="flex items-center" onSubmit={handleSubmit}>
      <label htmlFor="file-upload" className="cursor-pointer flex items-center">
          <div className="bg-gray-700 hover:bg-gray-600 transition duration-200 flex items-center justify-center rounded-full w-8 h-8">
            <img style={{ width: "16px", height: "16px" }} src="/attachment.png" alt="attachment" />
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          hidden
          
        />
        <input
          type="text"
          name="text"
          placeholder="Ask me anything..."
          className="flex-grow ml-4 p-3 bg-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l p-3 rounded-r-lg transition duration-200 flex items-center"
        >
          <img src="/arrow.png" alt="Submit" className="w-5 h-5" />
        </button>
      </form>
    </div>
  </div>
  )
}

export default DashBoard
