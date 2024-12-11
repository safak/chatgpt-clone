import React, { useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { config } from "../../conf/config";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook
import { PiPaperclipHorizontal } from "react-icons/pi";

const urlEndpoint = config.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = config.VITE_IMAGE_KIT_PUBLIC_KEY;

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
  const { setImage, setFileName, messageSent, resetMessageStatus } = useImage();
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
    console.log("the response from dataserver is:", res)
    setIsLoading(false);
    setError(""); // Clear any previous errors
    setImage((prev) => ({ ...prev, isLoading: false, dbData: res }));
    setFileName(res.name); // Update the uploaded file name in global context
  };

  const onUploadProgress = (progress) => {
    setImage((prev) => ({ ...prev, isLoading: true }));
  };

  return (
    <div>
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {isLoading ? (
          <div className="text-gray-500 px-2 flex flex-row">Uploading, please wait...</div>
        ) : (
          <div className="flex flex-row items-center">
            <label className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
              <PiPaperclipHorizontal className="w-6 h-6 rotate-90" />
              <IKUpload
                className="hidden"
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                onUploadStart={() => {
                  setIsLoading(true);
                }}
                onUploadProgress={onUploadProgress}
              />
            </label>
          </div>
        )}
      </IKContext>

      {error && (
        <div className="mt-2 text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

export default Upload;
