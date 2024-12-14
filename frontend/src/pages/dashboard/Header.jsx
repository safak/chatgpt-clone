import React from "react";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook
// import { LuNotebookText } from "react-icons/lu";

const Header = ({ inputText }) => {
  const { fileName } = useImage(); // Get the file name from the context

  // Function to truncate text
  const truncateText = (text, maxLength = 15) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="sticky top-0 flex items-center justify-center p-3 bg-[#fff4f4] border-b border-gray-300">
      <div className="flex justify-between items-center w-full">
        {/* Left Side - Input Text */}
        <div className="text-gray-800 font-medium truncate max-w-[50%]">
          {inputText ? (
            <div className="flex items-center space-x-2 bg-pink-100 text-purple-600 font-medium px-3 rounded-full">
              <span className="text-purple-500">
                {/* <LuNotebookText /> */}
              </span>
              <span className="truncate">{truncateText(inputText)}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right Side - File Name */}
        <div className="text-gray-800 ml-auto flex items-center font-semibold ">
          {fileName ? (
            <>
              <span className="mr-2 text-blue-600">{truncateText(fileName, 15)}</span>
              <span role="img" aria-label="Gemini" className="text-purple-500 text-xl">
                💎
              </span>
            </>
          ) : (
            <span className="text-gray-500 italic">💎 Gemini</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
