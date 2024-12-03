import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import orbital from "../../assets/orbital.png";
import { TypeAnimation } from 'react-type-animation';
import bot from "../../assets/bot.png"
import human1 from "../../assets/human1.jpeg"
import human2 from "../../assets/human2.jpeg"
import bg from "../../assets/bg.png"

function Home() {
  const [typingStatus, setTypingStatus] = useState("Human1");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center relative flex-grow">
        {/* Left Section */}
        <img
          src={orbital}
          alt=""
          className="absolute opacity-10 animate-rotate"
        />

        <div className="text-center lg:w-1/2 p-6 rounded-lg shadow-lg mb-6 lg:mb-0 z-10 relative">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-900 via-purple-500 to-red-500 bg-clip-text text-transparent mb-4">
            Chatbot
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-6">Welcome to the RAG LLM Model</h2>
          <h3 className="text-lg text-white mb-8 max-w-[60%] mx-auto font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nobis tenetur cumque error quo vel placeat velit, ullam fuga vitae tempore possimus accusamus tempora corrupti nihil! Nisi molestiae veniam assumenda.
          </h3>
          <Link to="/dashboard">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-200">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="relative bg-[url(${bg})] ">
          <div className="imgContainer">
            <div className="bgContainer">
              <div className=""></div>
            </div>
            <img
              src={bot}
              alt="Profile"
              className="botImage custom-size"
            />
            <div className="flex justify-center items-center bg-gray-900 rounded-xl p-4 space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={typingStatus === "Human1" ? human1 : typingStatus === "Human2" ? human2 : bot} // Conditional rendering of the image source
                  alt="Chatbot"
                  className="w-full h-full object-cover"
                />
              </div>
              <TypeAnimation
                sequence={[
                  "Human1: Summarize this Pdf", // The text to animate
                  2000, () => { setTypingStatus("Bot") },
                  "Bot: Your content is based on Food...", // Next text
                  2000, , () => { setTypingStatus("Human2") },
                  "Human2: What type questions are in this Pdf?", // The text to animate
                  2000, () => { setTypingStatus("Bot") },
                  "Bot: It contains mcqs on... ", // Another text
                  2000, , () => { setTypingStatus("Human1") },
                ]}
                cursor={true}
                wrapper='span'
                repeat={Infinity}  
                style={{color:'white'}}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
        
      </div>

      
    </div>
  );
}

export default Home;
