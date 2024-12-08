import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { useImage } from "../../contexts/ImageContext";
import Upload from "../../components/upload/Upload";

const ChatInput = ({
  inputText,
  setInputText,
  handleInputSubmit,
  inputRef,
}) => {
  const [clearFileNameTrigger, setClearFileNameTrigger] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputClick = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
    // Trigger file name clearing by toggling the trigger
    setClearFileNameTrigger((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 left-8 right-0 " onClick={handleInputClick}>
      <div className="flex flex-col  space-y-3 bg-gray-100 rounded-xl mx-[20%]  p-4">
        <input
          type="text"
          ref={inputRef}
          className="bg-gray-100 rounded-md outline-none text-black border-none text-lg"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          onClick={handleInputClick}
        />
        <div className="flex items-center justify-between text-black">
          <Upload onClearFileName={clearFileNameTrigger} /> {/* Pass trigger */}
          <div className="flex items-center space-x-3">
            <div className="text-gray-500 text-sm">{`${inputText.length}/2000`}</div>
            <button
              onClick={handleInputSubmit}
              className={`p-2 text-black rounded-full ${inputText.length > 1 ? "bg-white hover:bg-white" : "hover:bg-white"}`}
            >
              <FaArrowUpLong className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
