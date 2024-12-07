import React, { useRef } from "react";
import { BsSend } from "react-icons/bs";
import { FaArrowUpLong } from "react-icons/fa6";
import { TbPaperclip } from "react-icons/tb";

const ChatInput = ({
  inputText,
  setInputText,
  handleInputSubmit,
  handleIconClick,
  inputRef,
}) => {
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputClick = () => {
    if (inputRef?.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4" onClick={handleInputClick} >
      <div className="flex flex-col space-y-3 bg-gray-100 rounded-xl mx-[20%] p-4">
        {/* Chat input box */}
        <input
          type="text"
          ref={inputRef}
          className="bg-gray-100 rounded-md outline-none text-black border-none text-lg"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          onClick={handleInputClick} // Add this line to handle click
        />
        
        {/* Link section */}
        <div className="flex items-center justify-between text-black">
          {/* Icon for file upload (left side) */}
          <label htmlFor="uploadFile">
            <TbPaperclip className="text-2xl cursor-pointer" />
          </label>
          <input type="file" id="uploadFile" multiple={false} hidden />

          {/* Character count and Send button (right side) */}
          <div className="flex items-center space-x-3">
            {/* Character count */}
            <div className="text-gray-500 text-sm">{`${inputText.length}/2000`}</div>

            {/* Send button */}
            <button
              onClick={handleInputSubmit}
              className={`p-1 text-black rounded-full  ${
                inputText.length > 1
                  ? "bg-white hover:bg-white"
                  : "hover:bg-white"
              }`}
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
