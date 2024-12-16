// import React from 'react';
// import { FaFilePdf } from 'react-icons/fa'; // Using React Icons for PDF icon
// import getUserData from '../AserverAuth/getUserData';
// import { useDispatch } from 'react-redux';

// function HistorySection({ uploadedFiles }) {

//   const dispatch = useDispatch()
  

//   return (
//     <div className="flex-1 overflow-y-auto p-6">
//       {/* <h2 className="text-2xl font-bold mb-4">Upload History</h2> */}
//       {uploadedFiles && uploadedFiles.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto">
//           {uploadedFiles.map((file, index) => (
//             <div
//               key={index}
//               className="p-4 border rounded-md shadow-sm bg-gray-100 flex flex-col justify-between"
//             >
//               <div className="relative">
                
//                 {/* Display PDF icon on top of thumbnail */}
//                 <div className=" inset-0 flex justify-center items-center">
//                   <FaFilePdf className="text-red-600 text-4xl" /> {/* PDF icon */}
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <p className="text-gray-500 text-sm">
//                   Title: {file.fileName}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   Upload Time: {new Date(file.createdAt).toLocaleString()}
//                 </p>
//               </div>
//               <div className="mt-4 flex gap-2">
//                 <button
//                   className="bg-blue-500 text-white py-1 px-4 rounded-md"
//                   onClick={() => alert("Open chat functionality here")}
//                 >
//                   Chat
//                 </button>
//                 <button
//                   className="bg-green-500 text-white py-1 px-4 rounded-md"
//                   onClick={() => window.open(file.fileUrl, "_blank")}
//                 >
//                   Open
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">No files uploaded yet.</p>
//       )}
//     </div>
//   );
// }

// export default HistorySection;




import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa'; // Using React Icons for PDF icon
import getUserData from '../AserverAuth/getUserData';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentFile } from '../store/fileSlice';
function HistorySection({ uploadedFiles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingFileId, setLoadingFileId] = useState(null); // Track loading state for individual files
  // console.log("the files structure is:", uploadedFiles)

  const handleChatClick = async (fileId) => {
    setLoadingFileId(fileId); // Set the loading state
    try {
      const response = await getUserData.getVectorData(fileId); // Fetch vector data
      dispatch(setCurrentFile(response)); // Store response in Redux
      navigate('/dashboard/chat'); // Navigate to chat page
    } catch (error) {
      console.error('Error fetching vector data:', error);
    } finally {
      setLoadingFileId(null); // Reset the loading state
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {uploadedFiles && uploadedFiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-y-auto">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm bg-gray-100 flex flex-col justify-between"
            >
              <div className="relative">
                <div className="inset-0 flex justify-center items-center">
                  <FaFilePdf className="text-red-600 text-4xl" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Title: {file.fileName}</p>
                <p className="text-gray-500 text-sm">
                  Upload Time: {new Date(file.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className={`${
                    loadingFileId === file._id
                      ? 'bg-gray-500'
                      : 'bg-blue-500'
                  } text-white py-1 px-4 rounded-md`}
                  onClick={() => handleChatClick(file._id)}
                  disabled={loadingFileId === file.fileId}
                >
                  {loadingFileId === file._id ? 'Loading...' : 'Chat'}
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-md"
                  onClick={() => window.open(file.fileUrl, '_blank')}
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
