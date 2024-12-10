import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const ChatBody = ({ messages }) => {
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`${
                    msg.text ? "p-3 rounded-lg text-black" : ""
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
                        className="max-w-full h-auto p-0" // Responsive image
                      />
                    </div>
                  )}
                  {/* Render text as Markdown with customized spacing */}
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
                        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {/* Smooth scrolling div */}
            <div ref={scrollToBottomRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
