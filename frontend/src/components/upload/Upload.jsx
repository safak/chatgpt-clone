import React, { useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { config } from "../../conf/config";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook

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

const onError = (err) => {
  console.log("Error", err);
};

const onSuccess = (res, setImage, setFileName) => {
  console.log("Success", res);
  setImage((prev) => ({ ...prev, isLoading: false, dbData: res }));
  setFileName(res.name); // Update the uploaded file name
};

const onUploadProgress = (progress, setImage) => {
  setImage((prev) => ({ ...prev, isLoading: true }));
};

const onUploadStart = () => {
  console.log("Upload started");
};

function Upload({ onClearFileName }) {
  const { setImage } = useImage(); // Access global setImage
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [fileName, setFileName] = useState(""); // Uploaded file name

  useEffect(() => {
    // Clear the file name when onClearFileName triggers
    if (onClearFileName) {
      setFileName("");
    }
  }, [onClearFileName]);

  return (
    <div>
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {isLoading ? (
          <div className="text-gray-500 px-2">Uploading, please wait...</div>
        ) : fileName ? (
          <div className="flex flex-row items-center">
            <IKUpload
              onError={onError}
              onSuccess={(res) => {
                setIsLoading(false);
                onSuccess(res, setImage, setFileName);
              }}
              useUniqueFileName={true}
              onUploadStart={() => {
                setIsLoading(true);
                onUploadStart();
              }}
              onUploadProgress={(progress) => onUploadProgress(progress, setImage)}
            />
            <span className="text-green-600">Uploaded: {fileName}</span>
          </div>
        ) : (
          <IKUpload
            onError={onError}
            onSuccess={(res) => {
              setIsLoading(false);
              onSuccess(res, setImage, setFileName);
            }}
            useUniqueFileName={true}
            onUploadStart={() => {
              setIsLoading(true);
              onUploadStart();
            }}
            onUploadProgress={(progress) => onUploadProgress(progress, setImage)}
          />
        )}
      </IKContext>
    </div>
  );
}

export default Upload;
