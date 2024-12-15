import React, { useState, useRef } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import Upload from "../components/upload/Upload";
import { useImage } from "../contexts/ImageContext"; // Import the useImage hook

const ChatInput = ({ inputText, setInputText, handleInputSubmit, inputRef }) => {
  const { messageSent, markMessageAsSent, resetMessageStatus } = useImage();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image);
    // resetMessageStatus(); // Reset the messageSent flag when a new image is uploaded
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (inputText.trim() || uploadedImage) {
        handleInputSubmit(e);
        setInputText(""); // Clear input text
        // setUploadedImage(null); // Clear uploaded image
        // markMessageAsSent(); // Mark that a message was sent
      }
    }
  };

  // Focus the input field when the outer div is clicked
  const handleClickOutside = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full px-4 pb-4">
      <div
        onClick={handleClickOutside} // Click handler to focus the input
        className="flex flex-col space-y-2 bg-gray-100 rounded-3xl max-w-2xl mx-auto p-3 shadow-md"
      >
        <div className="flex items-center bg-gray-100 rounded-3xl px-4 py-2">
          {uploadedImage && (
            <div className="mr-2 bg-gray-200 px-3 py-1 rounded-full text-sm truncate max-w-[70%]">
              {"Image uploaded"}
            </div>
          )}
          <input
            type="text"
            ref={inputRef}
            className="flex-1 bg-gray-100 outline-none text-black border-none text-base"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleSendMessage}
          />
        
        <div className="flex items-center justify-between text-black">
          <div className="relative flex items-center pl-4">
            <Upload onUpload={(file) => handleImageUpload(file)} />
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-gray-500 text-sm">{`${inputText.length}/2000`}</div>
            <button
              onClick={handleSendMessage}
              className={`p-2 text-black rounded-full ${
                inputText.length > 0 || uploadedImage
                  ? "bg-white hover:bg-gray-200"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              <FaArrowUpLong className="text-lg" />
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
