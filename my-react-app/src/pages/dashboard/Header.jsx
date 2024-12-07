import React from "react";

const Header = ({ inputText, selectedBox }) => {
  return (
    <div className="sticky top-0 flex items-center justify-center p-3 bg-[#fff4f4]">
      <div className="flex justify-between items-center w-full">
        {/* Left Side - Input Text */}
        <div className="text-gray-700">
          {inputText ? `>${inputText}` : ""} {/* Hide text if no input text */}
        </div>

        {/* Right Side - Selected Box */}
        <div className="text-gray-700 ml-auto">
          {selectedBox ? `>${selectedBox}` : "Select Box"} {/* Display selected box */}
        </div>
      </div>

      {/* Conditional Horizontal Lines */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          inputText ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {inputText && <hr />}
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          selectedBox ? "opacity-100" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {selectedBox && <hr />}
      </div>
    </div>
  );
};

export default Header;
