import React from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import { config } from '../../conf/config';
import { useImage } from "../../contexts/ImageContext";  // Import the useImage hook

const urlEndpoint = config.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = config.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
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

const onError = err => {
  console.log('Error', err);
};

const onSuccess = (res, setImage) => {
  console.log('Success', res);
  setImage(prev => ({ ...prev, isLoading: false, dbData: res }));
};

const onUploadProgress = (progress, setImage) => {
  setImage(prev => ({ ...prev, isLoading: true }));
};

const onUploadStart = evt => {
  // console.log('Start', evt);
};

function Upload() {
  const { setImage } = useImage();  // Use the global setImage function

  return (
    <div>
      <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
        <p>Upload an image</p>
        <IKUpload
          onError={onError}
          onSuccess={(res) => onSuccess(res, setImage)}  // Pass setImage to update global state
          useUniqueFileName={true}
          onUploadStart={onUploadStart}
          onUploadProgress={(progress) => onUploadProgress(progress, setImage)}
        />
      </IKContext>
    </div>
  );
}

export default Upload;
