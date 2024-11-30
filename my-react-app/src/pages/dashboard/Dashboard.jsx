import React from 'react';
import { PiUploadSimpleLight } from "react-icons/pi";


function Dashboard() {
  return (
    <div className="p-2 space-y-4">
      {/* First Row: Single Box with Input */}
      <div className="flex items-center justify-center h-[150px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 border-2 border-dashed border-gray-300 rounded-lg shadow-lg relative overflow-hidden">
  {/* Pattern Background */}
  <div className="absolute inset-0  opacity-10 pointer-events-none"></div>
  
  <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full group">
    <span className="flex text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
    Upload PDF
    </span>
    <span className="flex text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
      
    <PiUploadSimpleLight />
    </span>
    <input
      type="file"
      accept=".pdf,.doc,.docx"
      className="hidden"
      aria-label="Upload document"
    />
  </label>
</div>


      {/* Second Row Onwards: Other Boxes */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px] h-[150px] bg-blue-500 text-white flex items-center justify-center rounded-lg">
          Box 1
        </div>
        <div className="flex-1 min-w-[150px] h-[150px] bg-green-500 text-white flex items-center justify-center rounded-lg">
          Box 2
        </div>
        <div className="flex-1 min-w-[150px] h-[150px] bg-red-500 text-white flex items-center justify-center rounded-lg">
          Box 3
        </div>
        <div className="flex-1 min-w-[150px] h-[150px] bg-yellow-500 text-white flex items-center justify-center rounded-lg">
          Box 4
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
