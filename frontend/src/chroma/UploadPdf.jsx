import React, { useState } from "react";
import Header from "../dashboard/Header2";
import HistorySection from "./HistorySection";
import UploadSection from "./UploadSection";

function UploadPdf() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold history of uploaded files
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the current file
  const [errorMessage, setErrorMessage] = useState(""); // State to hold validation error messages

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    // Validate if the file is a PDF
    if (file && file.type === "application/pdf") {
      setSelectedFile(file); // Save file for upload
      setErrorMessage(""); // Clear error
    } else {
      setSelectedFile(null); // Reset file
      setErrorMessage("Only PDF files are allowed."); // Set error message
    }
  };

  // Handle the file upload
  const handleUpload = () => {
    if (selectedFile) {
      // Mock uploading the file and adding to history
      const newUpload = {
        name: selectedFile.name,
        date: new Date().toLocaleString(),
      };

      setUploadedFiles((prev) => [newUpload, ...prev]); // Add to history
      setSelectedFile(null); // Reset selected file
      alert("PDF uploaded successfully!");
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Reuse existing Header */}
      <Header inputText="" />

      {/* History Section */}
      <HistorySection uploadedFiles={uploadedFiles} />

      {/* Upload Section */}
      <UploadSection
        selectedFile={selectedFile}
        errorMessage={errorMessage}
        handleFileChange={handleFileChange}
        handleUpload={handleUpload}
      />
    </div>
  );
}

export default UploadPdf;
