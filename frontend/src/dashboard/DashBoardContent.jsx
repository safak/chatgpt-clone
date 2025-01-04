import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header2"; 

const DashboardContent = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <motion.div
        className="flex-grow flex flex-col items-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 pt-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-5xl font-bold text-gray-800 mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to the RAG Platform
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 text-center px-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Use the left navigation bar to explore features like PDF uploads, dynamic chats, and more!
        </motion.p>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-center gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button
            className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
            onClick={() => navigate("/dashboard/uploadpdf")}
          >
            Upload PDF
          </button>
          <button
            className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
            onClick={() => navigate("/dashboard/chat")}
          >
            Chat with LLM
          </button>
        </motion.div>

        <motion.div
          className="w-full max-w-5xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 1.5, staggerChildren: 0.3 },
            },
          }}
        >
          {[
            { title: "PDF Parsing", description: "Effortlessly parse uploaded PDFs and extract valuable context." },
            { title: "Vectorization", description: "Transform content into vectors for seamless LLM integration." },
            { title: "LLM Integration", description: "Leverage cutting-edge LLMs for precise, context-aware responses." },
            { title: "Chat Sessions", description: "Engage in dynamic conversations tailored to your uploaded content." },
            { title: "Insights & Analytics", description: "Gain deep insights and analytics from your PDF data." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardContent;
