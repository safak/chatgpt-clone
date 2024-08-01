import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload  } from 'imagekitio-react'

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY

const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:4000/api/upload');

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

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null)

  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    console.log("Success", res);

    setImg((prev) => ({
      ...prev,
      isLoading: false,
      dbData: res
    }))
  };
  
  const onUploadProgress = progress => {
    console.log("Progress", progress);
  };
  
  const onUploadStart = evt => {
    //  evt CONTAINS THE LOCAL FILE INFORMATION

    // WE CHOOSE ONLY ONE FILE [0]
    const file = evt.target.files[0]

    // FOR Gemini
    const reader = new FileReader()
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            // WE TAKE THE SECOND ITEM [1] WHICH IS THE CODE VERSION (BUFFER) OF THE img
            data: reader.result.split(",")[1],
            mimeType: file.type
          }
        }
      }))
    }

    reader.readAsDataURL(file)
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