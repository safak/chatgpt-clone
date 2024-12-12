// ImageContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Image Context
const ImageContext = createContext();

// Custom hook to use Image context
export const useImage = () => {
  return useContext(ImageContext);
};

// Image provider component
export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState({ isLoading: false, dbData: null, aiData: null });
  const [fileName, setFileName] = useState(""); // Store the file name
  const [messageSent, setMessageSent] = useState(false); // Flag to track message sent after image upload

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  const updateFileName = (newFileName) => {
    setFileName(newFileName); // Update the file name globally
  };

  const markMessageAsSent = () => {
    setMessageSent(true);
  };

  const resetMessageStatus = () => {
    setMessageSent(false); // Reset flag when needed (e.g., when a new image is uploaded)
  };

  return (
    <ImageContext.Provider value={{ image, setImage: updateImage, fileName, setFileName: updateFileName, messageSent, markMessageAsSent, resetMessageStatus }}>
      {children}
    </ImageContext.Provider>
  );
};
