import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload  } from 'imagekitio-react'

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    // .files[0] INDICATES THE FIRST FILE ONLY
    const file = evt.target.files[0];

    // THIS IS THE React.js VERSION OF THE function TAKEN FROM Gemini API FROM A function WRITEN IN Node.js. SUGGESTED BY Gemini API.
    // Converts local file information to a GoogleGenerativeAI.Part object.
    // function fileToGenerativePart(path, mimeType) {
    //   return {
    //     inlineData: {
    //       data: Buffer.from(fs.readFileSync(path)).toString("base64"),
    //       mimeType
    //     },
    //   };
    // }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            // [1] CONTAINS THE code VERSION OF THE img
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        // SO I DON'T HAVE TO WORRY ABOUT GIVING UNIQUE FILE NAMES
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: 'none' }}
        ref={ikUploadRef}
      />

      <label htmlFor="" onClick={() => ikUploadRef.current.click() }><img src="/attachment.png" alt="" /></label>
    </IKContext>
  )
}

export default Upload