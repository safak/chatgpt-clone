import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"; // For annotation layer styles

const RAGInterface = () => {
  const fileUrl = useSelector((state) => state.file?.currentFileData?.fileUrl || "");
  const [fileBlob, setFileBlob] = useState(null);
  const [fileType, setFileType] = useState(""); // To determine if it's a PDF or an image
  const [numPages, setNumPages] = useState(null);

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

  // Callback to set number of pages for the PDF
  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="rag-container flex h-screen">
      {/* PDF Viewer on the left side */}
      <div className="pdf-container flex-1 p-4">
        {fileBlob ? (
          fileType === "image" ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={URL.createObjectURL(fileBlob)}
                alt="Current File"
                className="w-full max-h-[80vh] object-contain"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Document file={fileBlob} onLoadSuccess={onLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={index} pageNumber={index + 1} />
                ))}
              </Document>
            </motion.div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* Chat body on the right side */}
      <div className="chat-container flex-1 overflow-y-auto w-full custom-scrollbar">
        <div className="flex flex-col w-full max-w-3xl mx-auto">
          {/* Render messages here */}
          <div className="chat-header">
            <h2>Chat</h2>
          </div>
          {/* Your chat messages will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default RAGInterface;
