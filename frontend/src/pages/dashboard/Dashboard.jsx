import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { useImage } from "../../contexts/ImageContext";
import model from "../../lib/gemini";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const { image, setImage } = useImage();

  const handleInputSubmit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!inputText.trim() && !image.dbData?.url) return;

      const userMessage = {
        role: "user",
        text: inputText,
        image: image.dbData?.url,
      };

      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setInputText(""); // Clear input field
      setImage({ isLoading: false, dbData: null }); // Reset image state

      try {
        const aiResponse = await model.generateContent(inputText);
        const aiMessage = {
          role: "ai",
          text: aiResponse.response.text(),
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error generating AI response:", error);
        const errorMessage = {
          role: "ai",
          text: "Sorry, something went wrong. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const clearUploadedFile = () => {
    setImage({ isLoading: false, dbData: null }); // Reset image in context
  };

  return (
    <div className="flex flex-col h-screen">
      <Header inputText={inputText} />
      <div className="flex-1 overflow-y-hidden">
        <ChatBody messages={messages} />
      </div>
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleInputSubmit={handleInputSubmit}
        inputRef={inputRef}
        clearUploadedFile={clearUploadedFile} // Pass clear function
      />
    </div>
  );
}

export default Dashboard;
