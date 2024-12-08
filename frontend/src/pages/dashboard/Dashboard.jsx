import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody.jsx";
import ChatInput from "./ChatInput";
import { useImage } from "../../contexts/ImageContext"; // Import the useImage hook

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const { image, setImage } = useImage();  // Access global image state and setter

  const handleIconClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!inputText.trim() && !image.dbData?.url) return; // Ensure either text or image is present

      const userMessage = {
        role: "user",
        text: inputText,
        image: image.dbData?.url, // Add image if available
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setTimeout(() => {
        const aiResponse = {
          role: "ai",
          text: `AI Response to: "${inputText}"`,
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);

      setInputText("");
      setImage({ isLoading: false, dbData: null }); // Reset the image after sending
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header inputText={inputText} />
      <ChatBody messages={messages} />
      <ChatInput
        className=""
        inputText={inputText}
        setInputText={setInputText}
        handleInputSubmit={handleInputSubmit}
        handleIconClick={handleIconClick}
        inputRef={inputRef}
      />
    </div>
  );
}

export default Dashboard;
