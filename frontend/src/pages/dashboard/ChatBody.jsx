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
      <div
        className="w-full mx-auto"
        style={{ height: "calc(100vh - 9rem)" }} // Available space between header and input
      >
        <div
          ref={chatBodyRef}
          className="overflow-y-auto p-4 w-full custom-scrollbar"
          style={{ height: "calc(100vh - 9rem)", paddingBottom: "4rem" }} // Add padding at the bottom
        >
          <div className="flex flex-col w-full max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`p-3 rounded-lg text-black ${
                    msg.role === "user" ? "bg-gray-100" : "bg-[#fff4f4] text-black"
                  } max-w-[70%] flex flex-col items-start`}
                  style={{ fontFamily: "'Roboto', sans-serif" }}
                >
                  {/* Conditionally render image if available */}
                  {msg.image && (
                    <div className="mb-2">
                      <img src={msg.image} alt="uploaded" />
                    </div>
                  )}
                  {/* Conditionally render text if available */}
                  {msg.text && <div>{msg.text}</div>}
                </div>
              </div>
            ))}
            {/* Spacer div for padding */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
