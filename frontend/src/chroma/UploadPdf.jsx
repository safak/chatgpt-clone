import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../dashboard/Header2";
import HistorySection from "./HistorySection";
import UploadSection from "./UploadSection";
import getUserData from "../AserverAuth/getUserData"; // Assuming getUserData is a class
import { TfiReload } from "react-icons/tfi";


function UploadPdf() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const [isRotating, setIsRotating] = useState(false);

  const handleReloadClick = () => {
    // Trigger the rotation
    setIsRotating(true);

    // Call fetchFileHistory function after animation
    fetchFileHistory();

    // Reset the rotation state after the animation ends (1 second in this case)
    setTimeout(() => setIsRotating(false), 1000);
  };

  // Function to fetch file history
  const fetchFileHistory = async () => {
    try {
      // console.log("Inside the fetchHistory");
      const response = await getUserData.getFileHistory();
      // console.log("The response was from history:", response);
      setUploadedFiles(response.data || []);
    } catch (error) {
      console.error("Error fetching file history:", error.message);
    }
  };

  // Call the fetch function when the location changes
  useEffect(() => {
    fetchFileHistory();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setErrorMessage("");
    } else {
      setSelectedFile(null);
      setErrorMessage("Only PDF files are allowed.");
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newUpload = {
        name: selectedFile.name,
        date: new Date().toLocaleString(),
      };

      setUploadedFiles((prev) => [newUpload, ...prev]);
      setSelectedFile(null);
      alert("PDF uploaded successfully!");
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  return (


    <div className="flex flex-col h-screen">
    <Header inputText="Upload History" />

    {/* Title and Reload Icon */}
    <div className="flex items-center bg-gray-200 p-1 px-4 py-2">
      <h2 className="text-lg text-black px-4 font-semibold">Upload History</h2>
      <button
        onClick={handleReloadClick}
        className={`flex items-center justify-center text-black p-1 rounded-full hover:bg-white ${
          isRotating ? "rotate-animation" : ""
        }`}
        title="Reload History"
      >
        <TfiReload />
      </button>
    </div>

    <HistorySection uploadedFiles={uploadedFiles} />

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
