import React from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Using React Icons for PDF icon

function HistorySection({ uploadedFiles }) {
  console.log("The file history is:", uploadedFiles);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Upload History</h2>
      {uploadedFiles && uploadedFiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-gray-100 flex flex-col justify-between"
            >
              <div className="relative">
                
                {/* Display PDF icon on top of thumbnail */}
                <div className=" inset-0 flex justify-center items-center">
                  <FaFilePdf className="text-red-600 text-4xl" /> {/* PDF icon */}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-500 text-sm">
                  Upload Time: {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded-md"
                  onClick={() => alert("Open chat functionality here")}
                >
                  Chat
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-md"
                  onClick={() => window.open(file.fileUrl, "_blank")}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
}

export default HistorySection;
