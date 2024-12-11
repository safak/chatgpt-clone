import React from "react";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook

const Header = ({ inputText }) => {
  const { fileName } = useImage(); // Get the file name from the context

  return (
    <div className="sticky top-0 flex items-center justify-center p-3 bg-[#fff4f4] border-b border-gray-300">
      <div className="flex justify-between items-center w-full">
        {/* Left Side - Input Text */}
        <div className="text-gray-700">
          {inputText ? `>${inputText}` : ""} {/* Hide text if no input text */}
        </div>

        {/* Right Side - File Name */}
        <div className="text-gray-700 ml-auto flex items-center">
          {fileName ? `${fileName}` : "💎 Gemini"} {/* Display file name or default text */}
          {fileName && <span className="ml-2">💎</span>} {/* Gemini-related emoji */}
        </div>
      </div>

      {/* Conditional Horizontal Lines */}
      <div
        className={`transition-all duration-500 ease-in-out ${inputText ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        {inputText && <hr />}
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${fileName ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        {fileName && <hr />}
      </div>
    </div>
  );
};

export default Header;
