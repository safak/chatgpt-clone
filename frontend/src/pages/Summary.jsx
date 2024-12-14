import React, { useState } from "react";

const Summary = (data) => {
  const { english, original } = data.data;

  const [selectedLanguage, setSelectedLanguage] = useState("english"); // State to toggle language
  const summaryText = selectedLanguage === "english" ? english : original;

  const handleCopy = () => {
    if (summaryText) {
      navigator.clipboard.writeText(summaryText);
      alert(`Copied to clipboard: ${summaryText}`);
    } else {
      alert("No summary available to copy!");
    }
  };

  return (
    <div className=" min-w-[250px] max-w-[80vw] mx-auto">
  <div className="flex  gap-4 mb-4">
    {/* <button
      className={`px-4 py-2 rounded ${
        selectedLanguage === "english" ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
      onClick={() => setSelectedLanguage("english")}
    >
      English
    </button> */}
    
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={handleCopy}
    >
      Copy Summary
    </button>
  </div>
  <div className="bg-white p-2 rounded-md border">
    <p>
      <strong>{selectedLanguage === "english" ? "English" : "Original"} Summary:</strong>
    </p>
    <p>{summaryText || "Not yet provided"}</p>
  </div>
  <div className="flex justify-end mt-4">
    {/* Additional content can go here */}
  </div>
</div>

  );
};

export default Summary;
