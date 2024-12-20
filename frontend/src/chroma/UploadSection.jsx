import React from 'react';
import Upload from '../components/upload/Upload';

function UploadSection({ selectedFile, errorMessage, handleFileChange, handleUpload }) {
  return (
    <div className="flex justify-center items-center p-8 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Upload Your PDF</h2>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">Select a PDF file to upload.</p>

          {/* Upload Component */}
          <Upload  />
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default UploadSection;
