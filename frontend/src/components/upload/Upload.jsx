import React, { useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import conf from "../../conf/conf";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook
import { PiPaperclipHorizontal } from "react-icons/pi";
import { FaFileUpload } from "react-icons/fa";

import { FaS } from "react-icons/fa6";

const urlEndpoint = conf.imageKitEndpoint;
const publicKey = conf.imageKitPublicKey;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function Upload() {
  const { image, setImage, setFileName, messageSent, resetMessageStatus } = useImage();
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    if (messageSent) {
      setFileName(""); // Clear the file name once the message has been sent
      resetMessageStatus(); // Reset the messageSent flag
    }
  }, [messageSent, resetMessageStatus]);

  const onError = (err) => {
    setIsLoading(false); // Stop loading on error
    setError(`Upload failed: ${err.message || "An unexpected error occurred"}`);
    console.error("Error:", err);
  };


  
  const onSuccess = (res) => {
    console.log("Upload success response:", res);
  
    if (!res.url) {
      setError("File URL is missing from the response.");
      return;
    }
  
    fetch(res.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        return response.blob();
      })
      .then((fileBlob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage((prev) => ({
            ...prev,
            isLoading: false,
            aiData: {
              inlineData: {
                data: reader.result.split(",")[1], // Base64 string
                mimeType: fileBlob.type,
              },
            },
            dbData: res,
          }));
        };
        reader.readAsDataURL(fileBlob);
      })
      .catch((error) => {
        console.error("Error fetching or reading file:", error);
        setError(`Failed to fetch or read file: ${error.message}`);
      });
  
    setFileName(res.name);
    setIsLoading(false);
  };
  
  

  return (
    <div>
    <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
      {isLoading ? (
        <div className="text-black px-2 flex flex-row">Uploading, please wait...</div>
      ) : (
        <div className="flex flex-row items-center">
          <label className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFileUpload className="w-6 h-6  text-black" /> {/* Icon color set to black */}
            <IKUpload
              className="hidden"
              onError={onError}
              onSuccess={onSuccess}
              useUniqueFileName={true}
              onUploadStart={() => {
                setIsLoading(true);
                setError(""); // Clear any errors when upload starts
              }}
            />
          </label>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      )}
    </IKContext>
  </div>
  
  );
}

export default Upload;

