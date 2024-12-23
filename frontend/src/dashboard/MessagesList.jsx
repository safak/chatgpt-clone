import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const MessagesList = ({ messages, isLoading }) => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const scrollToBottomRef = useRef(null);

  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages]);

  useEffect(() => {
    // After all messages are rendered with animation delay, show loading if required
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setIsAnimationFinished(true);
      }, messages.length * 100); // Adjust the timeout to match your message animation duration (index * 0.1 delay)
      
      return () => clearTimeout(timeout);
    }
  }, [messages, isLoading]);

  const messageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const loadingVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div
      className="overflow-y-auto w-full custom-scrollbar"
      style={{ height: "calc(100vh - 11rem)", paddingBottom: "2rem" }}
    >
      <div className="flex flex-col w-full max-w-3xl mx-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, delay: index * 0.01 }}
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
                    className="max-w-full h-auto p-0 shadow"
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
          </motion.div>
        ))}

        {/* Show loading after messages are done animating */}
        {isLoading && isAnimationFinished && (
          <motion.div
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, delay: messages.length * 0.02 }}
            className="flex items-center mb-4"
          >
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
          </motion.div>
        )}

        {/* Always ensure the scroll goes to the latest message */}
        <div ref={scrollToBottomRef} className="p-2"></div>
      </div>
    </div>
  );
};

export default MessagesList;
