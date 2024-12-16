import React, { useState, useEffect, useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import conf from "../../conf/conf";
import { useSelector, useDispatch } from "react-redux";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook
import { FaFileUpload } from "react-icons/fa";
import uploadService from "../../AserverAuth/serviceUpload";
import { setCurrentFile, setCurrentFileData } from "../../store/fileSlice";

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
  const originalFileNameRef = useRef(""); // Use useRef for immediate updates
  const dispatch = useDispatch();

  useEffect(() => {
    if (messageSent) {
      setFileName(""); // Clear the file name once the message has been sent
      originalFileNameRef.current = ""; // Clear original file name
      resetMessageStatus(); // Reset the messageSent flag
    }
  }, [messageSent, resetMessageStatus]);

  const onError = (err) => {
    setIsLoading(false); // Stop loading on error
    setError(`Upload failed: ${err.message || "An unexpected error occurred"}`);
    console.error("Error:", err);
  };

  const onSuccess = async (res) => {
    if (!res.url) {
      setError("File URL is missing from the response.");
      return;
    }

    try {
      // Prepare the data for the server with the original file name
      const uploadData = {
        fileUrl: res.url, // File URL from the response
        fileName: originalFileNameRef.current, // Get the original file name from the ref
      };

      // Send the file URL and original name to the server
      // console.log("The uploading file data is :", uploadData);
      const serverResponse = await uploadService.addFileData(uploadData);
      // console.log("File uploaded successfully to the server:", serverResponse?.data?._id, serverResponse.data.fileUrl, serverResponse.data.fileName);

      const idForFile = serverResponse?.data?._id;
      const fileData = {
        fileId: idForFile,
        fileUrl: serverResponse.data.fileUrl,
        fileName: serverResponse.data.fileName,
      };
      
      dispatch(setCurrentFileData(fileData));

      // Update state with the uploaded data
      setImage((prev) => ({
        ...prev,
        isLoading: false,
      }));

      setFileName(res.name);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file to the server:", error);
      setError(`Failed to upload file: ${error.message}`);
    }
  };

  const handleUploadStart = (file) => {
    setIsLoading(true);
    setError(""); // Clear any errors when upload starts

    // Extract and store the original file name
    if (file) {
      // console.log("The file is :", file.target.files[0].name);
      originalFileNameRef.current = file.target.files[0].name; // Save the original name before uploading
    }
  };

  return (
    <div>
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        {isLoading ? (
          <div className="text-black px-2 flex flex-row">Uploading, please wait...</div>
        ) : (
          <div className="flex flex-row items-center">
            <label className="cursor-pointer flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300">
              <FaFileUpload className="w-6 h-6 text-black" />
              <IKUpload
                className="hidden"
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                onUploadStart={(file) => handleUploadStart(file)} // Pass the file to extract the original name
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
















  // const  onSuccess = (res) => {
  //   if (!res.url) {
  //     setError("File URL is missing from the response.");
  //     return;
  //   }
  
  //   fetch(res.url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch file: ${response.statusText}`);
  //       }
  //       return response.blob();
  //     })
  //     .then((fileBlob) => {
  //       const reader = new FileReader();
  //       reader.onloadend = async () => {
  //         try {
  //           const inlineData = {
  //             data: reader.result.split(",")[1], // Base64 string
  //             mimeType: fileBlob.type,
  //           };
  
  //           // Prepare the data for the server
  //           const uploadData = {
  //             fileUrl: res.url, // File URL
  //             inlineData,
  //           };
  
  //           // Send data to the server
  //           const serverResponse = await uploadService.addFileData(uploadData);
  //           console.log("File uploaded successfully to the server:", serverResponse?.data?._id);
  //           const idForFile = serverResponse?.data?._id
  
  //           // Update state with the uploaded data
  //           setImage((prev) => ({
  //             ...prev,
  //             isLoading: false,
  //             aiData: { inlineData},
  //             dbData: res, // Server response data
  //             currentFileId: idForFile
  //           }));
  //           setFileName(res.name);
  //           setIsLoading(false);
  //         } catch (error) {
  //           console.error("Error uploading file to the server:", error);
  //           setError(`Failed to upload file: ${error.message}`);
  //         }
  //       };
  
  //       reader.readAsDataURL(fileBlob); // Read the file as a Base64 string
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching or reading file:", error);
  //       setError(`Failed to fetch or read file: ${error.message}`);
  //     });
  
  //   // setFileName(res.name);
  //   // setIsLoading(false);
  // };
  
  
