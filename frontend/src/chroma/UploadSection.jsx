import React from 'react'

function UploadSection({ selectedFile, errorMessage, handleFileChange, handleUpload }) {
    return (
      <div className="p-6 border-t bg-white">
        <h2 className="text-xl font-bold mb-4">Upload Your PDF</h2>
        <p className="text-gray-600 mb-6">Select a PDF file to upload. Only .pdf files are allowed.</p>
  
        {/* File Input */}
        <input
          type="file"
          accept="application/pdf" // Restrict file picker to PDFs
          onChange={handleFileChange}
          className="mb-4"
        />
  
        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
  
        {/* Selected File */}
        {selectedFile && (
          <p className="text-green-600 mb-4">
            Selected File: {selectedFile.name}
          </p>
        )}
  
        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile} // Disable button if no file is selected
          className={`px-6 py-3 rounded-md text-white ${
            selectedFile
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Upload PDF
        </button>
      </div>
    );
  }

export default UploadSection
