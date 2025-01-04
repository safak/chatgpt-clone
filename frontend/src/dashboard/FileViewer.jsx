import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Styles for the PDF viewer
import "@react-pdf-viewer/default-layout/lib/styles/index.css"; // Styles for the default layout

const FileViewer = () => {
  const fileUrl = useSelector((state) => state.file?.currentFileData?.fileUrl || "");
  const [fileBlob, setFileBlob] = useState(null);
  const [fileType, setFileType] = useState(""); // To determine if it's a PDF or an image

  useEffect(() => {
    const fetchFile = async () => {
      if (!fileUrl) return;

      try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch file from URL: ${response.statusText}`);
        }

        const blob = await response.blob();
        setFileBlob(blob);

        // Determine file type based on file's MIME type
        const fileType = blob.type.split("/")[0]; // "image" or "application"
        setFileType(fileType);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [fileUrl]);

  return (
    <div className="file-viewer-container">
      {fileBlob ? (
        fileType === "image" ? (
          // Show image if it's an image file
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="image-container"
          >
            <img src={URL.createObjectURL(fileBlob)} alt="Current File" className="file-image" />
          </motion.div>
        ) : (
          // Show PDF if it's a PDF file
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="pdf-container"
          >
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
              <Viewer fileUrl={URL.createObjectURL(fileBlob)} />
            </Worker>
          </motion.div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default FileViewer;
