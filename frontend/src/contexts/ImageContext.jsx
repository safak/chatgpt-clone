import React, { createContext, useContext, useState } from 'react';

// Create Image Context
const ImageContext = createContext();

// Custom hook to use Image context
export const useImage = () => {
  return useContext(ImageContext);
};

// Image provider component
export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState({ isLoading: false, dbData: null });

  const updateImage = (newImage) => {
    setImage(newImage);
  };

  return (
    <ImageContext.Provider value={{ image, setImage: updateImage }}>
      {children}
    </ImageContext.Provider>
  );
};
