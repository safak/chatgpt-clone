import React, { useRef } from 'react'
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY; 
const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:3000/api/upload');

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
const upload = ({setImg}) => {
  const onError = err => {
    console.log("Error", err);
  };
  
  const onSuccess = res => {
    console.log("Success", res);
    setImg(prev=>({...prev, isLoading:false, dbData:res }));
  };
  
  const onUploadProgress = progress => {
    console.log("Progress", progress);
  };
  
  const onUploadStart = evt => {
    const file = evt.target.files[0];
    const reader = new  FileReader();
    reader.onload = () => {
      setImg(prev=>({...prev, isLoading:true, aiData:{inlineData: {
        data:reader.result.split(",")[1],
        mimeType: file.type,
      },
    }}));
    };
    reader.readAsDataURL(file);
   
  };
  const ikUploadRef = useRef(null);
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
          style = {{display:"none"}}
          ref={ikUploadRef}
        />
        {
          <label htmlFor="file-upload" className="cursor-pointer flex items-center"
          onClick={()=>ikUploadRef.current.click()}>
          <div className="bg-gray-700 hover:bg-gray-600 transition duration-200 flex items-center justify-center rounded-full w-8 h-8">
            <img style={{ width: "16px", height: "16px" }} src="/attachment.png" alt="attachment" />
          </div>
        </label>
        }
      </IKContext>
      
  )
}

export default upload
