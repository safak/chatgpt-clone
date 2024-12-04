import React, { useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
import { PiMagicWand } from "react-icons/pi";
import ScrollableFeed from "react-scrollable-feed"; // Library for scrollable chat feed
import { FaFileUpload } from "react-icons/fa";
import './dashboard.css'; // Adjust path as necessary



function Dashboard() {
  const [inputText, setInputText] = useState(""); // State for the input text
  const [messages, setMessages] = useState([]); // State for chat messages
  const [selectedOption, setSelectedOption] = useState("Option 1"); // State for the select dropdown
  const [selectedBox, setSelectedBox] = useState(null); // State for the selected box
  const inputRef = useRef(null); 
  const [selectedFile, setSelectedFile] = useState(null);

  
  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field when the icon is clicked
    }
  };


const handleFileUpload = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
};

const handleFileUploadSubmit = () => {
  if (!selectedFile) {
    alert("Please select a file to upload.");
    return;
  }
  // Logic for uploading the file (e.g., to a server or cloud storage)
  console.log("Uploading file:", selectedFile);
};


  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle input submission
  const handleInputSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!inputText.trim()) return; // Prevent empty messages

      // Add user message to the chat
      const userMessage = { role: "user", text: inputText };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Simulate AI response (replace with actual API call if needed)
      setTimeout(() => {
        const aiResponse = {
          role: "ai",
          text: `AI Response to: "${inputText}"`, // Placeholder AI response
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);

      setInputText(""); // Clear the input after submission
    }
  };

  // Handle select option change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // Handle selecting a box (update the selectedBox state)
  const handleBoxSelect = (boxName) => {
    setSelectedBox(boxName);
  };

  return (
    <div className="flex flex-col h-screen ">
    {/* Chat Header */}
    <div className="sticky top-0 flex items-center justify-center p-3 bg-gray-100">
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
  
    {/* Chat Body */}
    <div className={`flex-1  custom-scrollbar flex justify-center mx-[20%] my-[4%] p-4 ${messages.length === 0 ? 'hidden' : ''}`}>
  <div className="w-full max-w-4xl">
    <ScrollableFeed>
      {messages.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}>
          <div
            className={`p-3 rounded-lg text-black ${msg.role === "user" ? "bg-gray-100" : "bg-[#fff4f4] text-black"} max-w-[70%] font-roboto`}
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </ScrollableFeed>
  </div>
</div>



{/* Box Selection */}
<div className="p-4 bg-gray-100 border-t border-gray-300 flex justify-center mx-[20%] my-[4%] rounded-xl shadow-lg">
  {/* Upload and Box Selection Section */}
  <div className="w-full max-w-4xl flex flex-col items-center p-4 space-y-4 bg-white rounded-xl shadow-md">
    
    {/* File Upload Section */}
    <div className="w-full flex justify-between items-center border-b pb-4">
  <input
    type="file"
    onChange={handleFileUpload}
    className="border-2 rounded-lg p-2 bg-gray-50 text-gray-700 transition-all  focus:outline-none"
  />
  <button
  onClick={handleFileUploadSubmit}
  className="ml-4 p-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
>
  <FaFileUpload className="text-white text-xl" />
  <span>Upload File</span>
</button>

</div>


    {/* Box Selection Section */}
    <div className="w-full flex justify-between space-x-4 mt-4">
      <button
        onClick={() => handleBoxSelect("Box 1")}
        className="p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none transform hover:scale-105 transition-all duration-300 w-full"
      >
        Select Box 1
      </button>
      <button
        onClick={() => handleBoxSelect("Box 2")}
        className="p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none transform hover:scale-105 transition-all duration-300 w-full"
      >
        Select Box 2
      </button>
      <button
        onClick={() => handleBoxSelect("Box 3")}
        className="p-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none transform hover:scale-105 transition-all duration-300 w-full"
      >
        Select Box 3
      </button>
    </div>
  </div>
</div>


{/* Chat Input */}
<div className="flex items-center space-x-3 border-t bg-gray-100 justify-center rounded-xl mx-[20%] my-[4%] p-4 cursor-text" onClick={handleIconClick} >
      {/* Icon click will focus the input */}
      <PiMagicWand className="text-black cursor-pointer" onClick={handleIconClick} />
      
      {/* Input box */}
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input element
        className="flex-1 p-3 bg-gray-100 rounded-md outline-none text-black border-none"
        placeholder="Type your message..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleInputSubmit}
      />

      {/* Character count */}
      <div className="flex items-center justify-end p-2 text-gray-500">
        <p>{`${inputText.length}/2000`}</p>
      </div>

      {/* Send button */}
      <button
        onClick={handleInputSubmit}
        className={`p-3 text-gray-500 rounded-md ${inputText.length > 1 ? 'bg-green-200 hover:bg-green-400' : 'hover:bg-green-200'}`}
      >
        <BsSend />
      </button>
    </div>


  </div>
  
  );
}

export default Dashboard;
