import React, { useState, useRef, useEffect } from "react";
import { useImage } from "../contexts/ImageContext";
import { useLoading } from "../contexts/LoadingContext";
import { useDispatch, useSelector } from 'react-redux';
import Header from "./Header2";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { handleInputSubmitLogic } from "../utils/chatHandler";
import { v4 as uuidv4 } from "uuid";  // Import uuidv4 for unique chat ID generation

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const { image, setImage, messages, addMessage } = useImage();
  const { isLoading, setIsLoading } = useLoading();
  const [chatId, setChatId] = useState(null);  // State to store the chat ID
  // const fileUrl = useSelector((state) => state.file?.currentFileData?.fileUrl || "");

  
  const fileUrl = useSelector((state) => state.file?.currentFileData?.fileUrl || "");
  const fileId = useSelector((state) => state.file?.currentFileData?.fileId || "");
  const vectorData = useSelector((state) => state.file?.currentFile || null);



  
  // Generate a unique chat ID when the dashboard is loaded
  useEffect(() => {
    setChatId(uuidv4()); // Generate and set a unique ID for the chat
  }, []);

  // Manage loading state after a response is received
  useEffect(() => {
    if (!isLoading) {
      // Reset the input text and image once loading is done
      setInputText('');
      // setImage({ isLoading: false, dbData: null });
    }
  }, [isLoading]);

  const handleInputSubmit = (e) => {
    // Prevent submitting if already loading
    if (isLoading) return;

    handleInputSubmitLogic({
      e,
      inputText,
      setInputText,
      image,
      setImage,
      addMessage,
      messages, // Pass the messages array
      isLoading,
      setIsLoading,
      fileUrl,
      fileId,
      vectorData,
      associatedChat: chatId, // Pass the generated chat ID
    });
  };

  const clearUploadedFile = () => {
    // setImage({ isLoading: false, dbData: null });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header inputText={inputText} />
      <div className="flex-1 overflow-y-hidden">
        <ChatBody messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleInputSubmit={handleInputSubmit}
        inputRef={inputRef}
        clearUploadedFile={clearUploadedFile}
      />
    </div>
  );
}

export default Dashboard;
