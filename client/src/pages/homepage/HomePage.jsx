import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './homepage.css';
import BackgroundImage from "../../assests/images/orbital.png"
import { TypeAnimation } from 'react-type-animation';
const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  return (
    <>
    <div className="flex flex-col md:flex-row h-screen bg-black">
    <img src={BackgroundImage} alt="Background Image" className="orbital" />
    {/* Left Side Component */}
    <div className="flex-1 p-6 flex flex-col justify-center items-center">
  <div className="text-center">
    <h1 className="agni-ai text-5xl md:text-6xl mb-4">CLEO AI</h1>
    <p className="text-white mt-2 text-xl md:text-2xl font-semibold">Transforming Questions into Insights.</p>
    <Link to="/dashboard">
    <button
      type="button"
      className="mt-6 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out transform hover:scale-105"
    >
      Get Started
    </button>
    </Link>
  </div>
</div>
    {/* Right Side Component */}
<div className="flex-1 p-6 flex justify-center items-center">
    <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Cleo, what's the secret to happiness?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Cleo: Gratitude is key! Have you expressed yours today?",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: Not yet.",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Cleo: Try listing three things you’re thankful for!",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
      </div>
  </div>
</div>
<footer className="bg-black text-white py-4 mt-auto">
    <div className="container mx-auto text-center">
      <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </div>
</footer>
</>
  )
}

export default HomePage
