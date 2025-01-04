import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import NoMessagesPlaceholder from "./NoMessagesPlaceholder";
import MessagesList from "./MessagesList";

const ChatBody = ({ messages, isLoading }) => {
  return (
    <div className="relative flex justify-center flex-1 mt-2">
      <div
        className="w-full mx-auto"
        style={{ height: "calc(100vh - 8rem)" }} // Available space between header and input
      >
        <AnimatePresence mode="wait">
          {messages && messages.length > 0 ? (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <MessagesList messages={messages} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <NoMessagesPlaceholder />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatBody;
