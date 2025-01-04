// import React from "react";
// import { useImage } from "../contexts/ImageContext"; // Import the useImage hook
// import { BsChatLeftText } from "react-icons/bs";
// import { useDispatch, useSelector } from 'react-redux';


// const Header = ({ inputText }) => {
//   const fileName = useSelector((state) => state.file?.currentFileData?.fileName || "");

//   // Function to truncate text
//   const truncateText = (text, maxLength = 15) => {
//     if (!text) return "";
//     return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
//   };

//   return (
//     <div className="sticky top-0 flex items-center justify-center p-3 bg-[#fff4f4] border-b border-gray-300">
//       <div className="flex justify-between items-center w-full">
//         {/* Left Side - Input Text */}
//         <div className="text-gray-800 font-medium truncate max-w-[50%]">
//           {inputText ? (
//             <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full">
//               <span className="text-purple-500">
//                 <BsChatLeftText />
//               </span>
//               <span className="truncate">{truncateText(inputText)}</span>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>

//         {/* Right Side - File Name */}
//         <div className="text-gray-800 ml-auto flex items-center font-semibold ">
//           {fileName ? (
//             <>
//               <span className="mr-2 text-blue-600">{truncateText(fileName, 15)}</span>
//               <span role="img" aria-label="Gemini" className="text-purple-500 ">
//                 💎
//               </span>
//             </>
//           ) : (
//             <span className="text-gray-500 italic">💎 Gemini</span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;






import React from "react";  
import { BsChatLeftText } from "react-icons/bs";
import { useSelector } from "react-redux";

const Header = ({ inputText, currentModel = "💎 Gemini" }) => {
  // Redux selector for current PDF (file name)
  const fileName = useSelector((state) => state.file?.currentFileData?.fileName || "No file in chat yet");

  // Function to truncate text
  const truncateText = (text, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="sticky top-0 flex items-center justify-between p-2 pb-3 bg-[#fff4f4] border-b border-gray-300">
      {/* Input Text Section */}
      <div className="flex-1 text-gray-800 font-medium truncate max-w-[40%]">
        {inputText ? (
          <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full max-w-[30%]">
            <span className="text-purple-500">
              <BsChatLeftText />
            </span>
            <span className="truncate">{truncateText(inputText)}</span>
          </div>
        ) : (
          <span className="text-gray-500 italic">No Input</span>
        )}
      </div>

      {/* Current PDF Section */}
      <div className="flex-1 text-gray-800 font-medium text-center truncate">
        <span className="text-blue-600">{truncateText(fileName)}</span>
      </div>

      {/* Current Model Section */}
      <div className="flex-1 text-gray-800 font-medium text-right truncate">
        {currentModel ? (
          <span className="text-green-600">{truncateText(currentModel)}</span>
        ) : (
          <span className="text-gray-500 italic">No Model</span>
        )}
      </div>
    </div>
  );
};

export default Header;
