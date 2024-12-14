import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const ChatBody = ({ messages, isLoading }) => {
  const chatBodyRef = useRef(null); // Ref to the chat body container
  const scrollToBottomRef = useRef(null); // Ref for the smooth scrolling div

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  return (
    <div className="relative flex justify-center flex-1 mt-2">
      <div ref={scrollToBottomRef}></div>
      <div
        className="w-full mx-auto"
        style={{ height: "calc(100vh - 8rem)" }} // Available space between header and input
      >
        <div
          ref={chatBodyRef}
          className="overflow-y-auto w-full custom-scrollbar"
          style={{ height: "calc(100vh - 11rem)", paddingBottom: "2rem" }} // Add padding at the bottom
        >
          <div className="flex flex-col w-full max-w-3xl mx-auto">
            {messages && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
                >
                  <div
                    className={`${
                      msg.text ? "p-3 rounded-lg text-black shadow" : ""
                    } ${msg.role === "user" ? "bg-gray-100" : "bg-[#fff4f4] text-black"} ${
                      msg.text ? "max-w-[70%]" : "max-w-[90%]"
                    } flex flex-col items-start`}
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      backgroundColor: msg.image && !msg.text ? "transparent" : undefined,
                    }}
                  >
                    {/* Render image if available */}
                    {msg.image && (
                      <div className={`${msg.text ? "mb-2" : ""}`}>
                        <img
                          src={msg.image}
                          alt="uploaded"
                          className="max-w-full h-auto p-0 shadow" // Responsive image
                        />
                      </div>
                    )}
                    {/* Render text as Markdown */}
                    {msg.text && (
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1 className="mt-4 mb-2 text-2xl font-bold" {...props} />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="mt-4 mb-2 text-xl font-semibold" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="mt-4 mb-2 text-lg font-medium" {...props} />
                          ),
                          p: ({ node, ...props }) => <p className="" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No messages yet. Start the conversation!
              </div>
            )}

            {/* Display loading message */}
            {isLoading && (
              <div className="flex items-center mb-4">
                <div className="flex items-center text-black p-3 rounded-lg bg-[#fff4f4] shadow">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </div>
            )}

            <div ref={scrollToBottomRef} className="p-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
