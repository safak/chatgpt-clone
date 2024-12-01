import React, { useState } from 'react';
import { PiUploadSimpleLight } from "react-icons/pi";
import { LuHome, LuPlus, LuPanelLeftOpen, LuPanelRightOpen } from "react-icons/lu";
import { MdSend } from "react-icons/md"; // Add send icon for the input box

function Dashboard() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [inputText, setInputText] = useState(""); // State for the input text
  const [selectedOption, setSelectedOption] = useState("Option 1"); // State for the select dropdown

  // Handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle input submission
  const handleInputSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      console.log("Input submitted:", inputText); // Handle input submission here
      setInputText(""); // Clear the input after submission
    }
  };

  // Handle select option change
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

 

  return (
    <div className="transition-all duration-500 ease-in-out">
      {/* Top Bar (Sticky to the top of the component) */}
      <div className="sticky flex items-center justify-center p-3  hover:text-black">
        <div className="flex justify-between items-center">
          <div className="text-gray-700">
            {inputText ? `>${inputText}` : ""} {/* Hide text if no box is selected */}
            {selectedBox ? `>${selectedBox}` : ""} {/* Hide text if no box is selected */}
          </div>
        </div>
      </div>

      {/* Conditionally render the hr only if a box is selected */}
      <div className={`transition-all duration-500 ease-in-out ${inputText ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'} `}>
        {inputText && <hr />}
      </div>
      <div className={`transition-all duration-500 ease-in-out ${selectedBox ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'} `}>
        {selectedBox && <hr />}
      </div>

      <div className="m-16 p-16">
        {/* First Row: Single Box with Input */}
        <div
          className={`flex items-center justify-center h-[150px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400 border-2 border-dashed border-gray-300 rounded-lg shadow-lg relative overflow-hidden transition-all duration-500 ease-in-out ${selectedBox ? 'opacity-100' : 'opacity-0 max-h-0'}`}
        >
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"></div>

          <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full group">
            <span className="flex text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
              Upload PDF
            </span>
            <span className="flex text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
              <PiUploadSimpleLight />
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              aria-label="Upload document"
            />
          </label>
        </div>

        {/* Second Row Onwards: Other Boxes */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div
            onClick={() => setSelectedBox("Upload Pdf")}
            className="flex-1 min-w-[150px] h-[150px] bg-blue-500 text-white flex items-center justify-center rounded-lg cursor-pointer"
          >
            Upload Pdf
          </div>
          <div
            onClick={() => setSelectedBox("Select Type")}
            className="flex-1 min-w-[150px] h-[150px] bg-green-500 text-white flex items-center justify-center rounded-lg cursor-pointer"
          >
            Select Type
          </div>
          <div
            onClick={() => setSelectedBox("Response")}
            className="flex-1 min-w-[150px] h-[150px] bg-red-500 text-white flex items-center justify-center rounded-lg cursor-pointer"
          >
            Response
          </div>
          <div
            onClick={() => setSelectedBox("LLM")}
            className="flex-1 min-w-[150px] h-[150px] bg-yellow-500 text-white flex items-center justify-center rounded-lg cursor-pointer"
          >
            LLM
          </div>
        </div>
      </div>

      {/* Chat Input Box (at the bottom) */}
      <div className="transition-all duration-500 ease-in-out">
      {/* Your other content here */}

      {/* Chat Input Box (at the bottom) */}
      <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] bg-[#ededed] rounded-md shadow-lg p-4 flex items-center space-x-4">
        {/* Select Dropdown */}
        <select
          value={selectedOption}
          onChange={handleSelectChange}
          className="bg-white border-2 border-gray-300 rounded-md p-3 text-gray-700 outline-none  hover:border-black transition-all duration-300 hover:bg-gray-50 flex-shrink-0"
        >
          <option value="Option 1" className="p-2">Option 1</option>
          <option value="Option 2" className="p-2">Option 2</option>
          <option value="Option 3" className="p-2">Option 3</option>
        </select>


        {/* Input Box */}
        <input
          type="text"
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-500 outline-none p-2"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
        />

        {/* Send Button */}
        <button
          onClick={handleInputSubmit}
          className="flex items-center justify-center bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors duration-200"
        >
          <MdSend />
        </button>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
