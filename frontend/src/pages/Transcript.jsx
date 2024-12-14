import React, { useState } from "react";

const Transcript = ({ data }) => {
  const [view, setView] = useState("original");

  const renderTranscript = (transcript) => {
    return transcript.map((entry, index) => (
      <div
        key={entry._id || index}
        className="flex items-center my-2 px-3 py-2 bg-white rounded-md shadow-sm w-full"
      >
        <span
          className="inline-block px-2 py-1 bg-blue-500 text-white rounded-md mr-3"
          style={{ backgroundColor: "#00BFFF" }}
        >
          {entry.timestamp[0]} - {entry.timestamp[1]}
        </span>
        <span className="flex-1 bg-gray-200 p-2 rounded-md">
          {entry.text}
        </span>
      </div>
    ));
  };

  const copyTranscript = () => {
    const transcriptText = data?.[view]?.map((entry) => entry.text).join("\n");
    navigator.clipboard
      .writeText(transcriptText)
      .then(() => alert("Transcript copied to clipboard!"))
      .catch((err) => alert("Failed to copy transcript: " + err));
  };

  return (
    <div className=" w-full">
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={copyTranscript}
        >
          Copy Transcript
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "english" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"
          }`}
          onClick={() => setView("english")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "original" ? "bg-blue-500 text-white" : "bg-gray-400 text-black"
          }`}
          onClick={() => setView("original")}
        >
          Original
        </button>
      </div>

      <div
        className="overflow-y-auto  overflow-auto scrollbar-thin bg-white p-4 rounded-md shadow-inner w-full"
        // style={{ maxHeight: full }}
      >
        {view === "original" ? (
          <>
            <h5 className="font-semibold text-lg mb-2">Original Transcript</h5>
            {data?.original ? renderTranscript(data.original) : <p>No data available.</p>}
          </>
        ) : (
          <>
            <h5 className="font-semibold text-lg mb-2">English Transcript</h5>
            {data?.english ? renderTranscript(data.english) : <p>No data available.</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Transcript;
