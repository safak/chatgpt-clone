import React, { useRef, useEffect } from "react";

const ChatBody = ({ messages }) => {
  const chatBodyRef = useRef(null); // Ref to the chat body container

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling
      });
    }
  }, [messages]);

  return (
    <div className="relative flex justify-center flex-1">
  {/* Outer Wrapper for Centering */}
  <div
    className="w-full mx-auto"
    style={{ height: "calc(100vh - 9rem)" }} // Available space between header and input
  >
    {/* ChatBody Wrapper (This is where the scrollbar lives) */}
    <div
      ref={chatBodyRef}
      className="overflow-y-auto p-4 w-full custom-scrollbar"
      style={{ height: "calc(100vh - 9rem)" }}
    >
      {/* Chat Messages Wrapper (Centering chat content) */}
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`p-3 rounded-lg text-black ${
                msg.role === "user" ? "bg-gray-100" : "bg-[#fff4f4] text-black"
              } max-w-[70%] font-roboto`}
              style={{ fontFamily: "'Roboto', sans-serif" }}
            >
              {msg.text}
            </div>
          </div>
           
        ))}
      </div>
      <div className=" flex flex-col w-full max-w-4xl mx-auto">
        
      </div>
    </div>
  </div>
</div>


  );
};

export default ChatBody;
