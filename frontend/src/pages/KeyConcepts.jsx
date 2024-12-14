import React, { useState, useEffect } from 'react';
import { MdContentCopy } from "react-icons/md"; // Import the icon

function KeyConcepts({ data }) {
  const [keyConcepts, setKeyConcepts] = useState(null);

  useEffect(() => {
    setKeyConcepts(data.keyconcept); // Safely update state
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(keyConcepts.description)
      .then(() => alert('Concept copied to clipboard!'))
      .catch((err) => alert('Failed to copy concept: ' + err));
  };

  if (!keyConcepts) {
    return <p>Loading key concepts...</p>; // Placeholder while loading
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Key Concepts</h2>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Description:</h3>
          <p className="text-gray-600">{keyConcepts.description}</p>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center"
          title="Copy to Clipboard"
        >
          <MdContentCopy size={20} /> {/* Use the MdContentCopy icon */}
        </button>
      </div>
    </div>
  );
}

export default KeyConcepts;
