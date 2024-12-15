import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import Header from "../dashboard/Header2";
import HistorySection from "./HistorySection";
import UploadSection from "./UploadSection";
import getUserData from "../AserverAuth/getUserData"; // Assuming getUserData is a class

function UploadPdf() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold history of uploaded files
  const [selectedFile, setSelectedFile] = useState(null); // State to hold the current file
  const [errorMessage, setErrorMessage] = useState(""); // State to hold validation error messages
  const location = useLocation(); // Hook to track the current location (route)

  // Function to fetch file history
  const fetchFileHistory = async () => {
    try {
      console.log("Inside the fetchHistory")
      const response = await getUserData.getFileHistory(); // Call the class method
      console.log("The response was from history:", response);
      setUploadedFiles(response.data || []); // Set fetched file history
    } catch (error) {
      console.error("Error fetching file history:", error.message);
    }
  };

  // Call the fetch function when the location changes
  useEffect(() => {
    fetchFileHistory(); // Trigger the fetch function when the route changes
  }, [location]); // Run the effect whenever the location changes

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

      {/* Reload Button */}
      <button
        onClick={fetchFileHistory}
        className="p-2 bg-blue-500 text-white rounded-full"
      >
        🔄 {/* Reload symbol */}
      </button>

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
