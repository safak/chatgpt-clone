import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useImage } from "../../contexts/ImageContext";
import { useLoading } from "../../contexts/LoadingContext";
import { startChatWithMessage } from "../../lib/geminiHelperFunc";
import { generateContentWithRetry } from "../../lib/geminiHelperFunc";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const { image, setImage, messages,setMessages,  addMessage } = useImage();
  const { isLoading, setIsLoading } = useLoading();


  const handleInputSubmit = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && !isLoading) {
      // Validate input (ensure text or image URL is provided)
      if (!inputText.trim() && !image.dbData?.url) {
        console.warn("Input is empty and no image is provided.");
        return;
      }
  
      // Create a user message with optional image URL
      const userMessage = {
        role: "user",
        text: inputText,
        image: image.dbData?.url, // Optional image URL
        aiData: image.aiData,     // Optional AI-specific data
      };
  
      // Add the user message to chat history
      addMessage(userMessage);
  
      // Reset input and image state after sending the message
      setInputText("");
      setImage({ isLoading: false, dbData: null });
      setIsLoading(true);
  
      try {
        let aiResponse;
        const payload = image.aiData
          ? [image.aiData, inputText] // Include aiData if available
          : [inputText];    
  
        // Check if aiData exists and send the image with text if present
        if (image.aiData) {
          console.log("Sending with AI data and image.");
          aiResponse = await startChatWithMessage(payload);
        } else {
          // console.log("Sending with just text.");
          aiResponse = await startChatWithMessage(payload);
        }
  
        // Add AI response to chat history
        const aiMessage = {
          role: "model",  // Correct role for AI message
          text: aiResponse,
        };
        addMessage(aiMessage);
  
      } catch (error) {
        console.error("Error during startChatWithMessage:", error);
  
        try {
          // Fallback to generateContentWithRetry if the primary API call fails
          console.log("Falling back to generateContentWithRetry...");
          const payload = image.aiData
          ? [image.aiData, inputText] // Include aiData if available
          : [inputText];  
          const fallbackResponse = await generateContentWithRetry(payload);
  
          const fallbackMessage = {
            role: "model", // Correct role for fallback message
            text: fallbackResponse,
          };
  
          addMessage(fallbackMessage);
        } catch (fallbackError) {
          console.error("Error during fallback to generateContentWithRetry:", fallbackError);
  
          const errorMessage = {
            role: "model",  // Correct role for error message
            text: "Sorry, something went wrong. Please try again later.",
          };
  
          addMessage(errorMessage);
        }
      } finally {
        setIsLoading(false); // Stop loading state
      }
    }
  };
  

  // const handleInputSubmit = async (e) => {
  //   if ((e.key === "Enter" || e.type === "click") && !isLoading) {
  //     // Validate input
  //     if (!inputText.trim() && !image.dbData?.url) {
  //       console.warn("Input is empty and no image is provided.");
  //       return;
  //     }
  
  //     // Create a user message
  //     const userMessage = {
  //       role: "user",
  //       text: inputText,
  //       image: image.dbData?.url, // Optional image URL
  //       aiData: image.aiData,
  //     };
  //     addMessage(userMessage);
  
  //     setInputText("");
  //     setImage({ isLoading: false, dbData: null });
  //     setIsLoading(true);
  
  //     try {
  //       // Format messages as history for API
  //       const formattedHistory = messages.map((msg) => ({
  //         role: msg.role === "ai" ? "model" : msg.role,
  //         parts: [{ text: msg.text }],
  //       }));
  
  //       // Pass the history to the chat function
  //       const aiResponse = await startChatWithMessage(inputText, image.aiData, formattedHistory);
  
  //       const aiMessage = {
  //         role: "model",
  //         text: aiResponse,
  //       };
  //       addMessage(aiMessage);
  //     } catch (error) {
  //       console.error("Error during startChatWithMessage:", error);
  
  //       const errorMessage = {
  //         role: "model",
  //         text: "Sorry, something went wrong. Please try again later.",
  //       };
  //       addMessage(errorMessage);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  // };
  
  

  const clearUploadedFile = () => {
    setImage({ isLoading: false, dbData: null });
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
 