import React, { useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import Upload from "../components/upload/Upload";
import { useImage } from "../contexts/ImageContext"; // Import the useImage hook
import { motion } from "framer-motion";

const ChatInput = ({ inputText, setInputText, handleInputSubmit, inputRef }) => {
  const { messageSent, markMessageAsSent, resetMessageStatus } = useImage();
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(image);
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (inputText.trim() || uploadedImage) {
        handleInputSubmit(e);
        setInputText(""); // Clear input text
      }
    }
  };

  // Focus the input field when the outer div is clicked
  const handleClickOutside = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      className="w-full px-4 pb-4"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        onClick={handleClickOutside}
        className="flex flex-col space-y-2 bg-gray-100 rounded-3xl max-w-2xl mx-auto p-3 shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center bg-gray-100 rounded-3xl px-4 py-2">
          {/* Uploaded Image Animation */}
          {uploadedImage && (
            <motion.div
              className="mr-2 bg-gray-200 px-3 py-1 rounded-full text-sm truncate max-w-[70%]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {"Image uploaded"}
            </motion.div>
          )}
          {/* Input Field */}
          <motion.input
            type="text"
            ref={inputRef}
            className="flex-1 bg-gray-100 outline-none text-black border-none text-base"
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleSendMessage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <div className="flex items-center justify-between text-black">
            <motion.div
              className="relative flex items-center pl-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Upload onUpload={(file) => handleImageUpload(file)} />
            </motion.div>
            <motion.div
              className="flex items-center space-x-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-gray-500 text-sm">{`${inputText.length}/2000`}</div>
              <motion.button
                onClick={handleSendMessage}
                className={`p-2 text-black rounded-full ${
                  inputText.length > 0 || uploadedImage
                    ? "bg-white hover:bg-gray-200"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowUpLong className="text-lg" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatInput;
