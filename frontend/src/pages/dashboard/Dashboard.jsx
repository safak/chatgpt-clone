import React, { useState, useRef } from "react";
import Header from "./Header";
import ChatBody from "./ChatBody.jsx"

import ChatInput from "./ChatInput";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!inputText.trim()) return;
      const userMessage = { role: "user", text: inputText };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setTimeout(() => {
        const aiResponse = {
          role: "ai",
          text: `AI Response to: "${inputText}"`,
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);

      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
  <Header inputText={inputText} />
  <ChatBody messages={messages} />
  <ChatInput
    className="mb-4 m-4"
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
