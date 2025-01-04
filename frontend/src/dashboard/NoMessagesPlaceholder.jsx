import React from "react";
import { motion } from "framer-motion";

const NoMessagesPlaceholder = () => {
  const animationVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex justify-center items-center h-full text-gray-500"
      variants={animationVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="text-center">
        <p className="text-lg font-medium mb-2">Start your conversation!</p>
        <motion.div
          className="w-12 h-12 bg-gray-200 rounded-full mx-auto"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

export default NoMessagesPlaceholder;
