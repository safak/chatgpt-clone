import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

import './homePage.css'

const HomePage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  // const test = async () => {
  //   await fetch('http://localhost:4000/api/test', {
  //     credentials: 'include'
  //   })
  // }

  return (
    <div className="homepage">
      {/* <img src="/orbital.png" alt="" className='orbital' /> */}

      <div className="left">
        <h1>AI CHAT</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, magnam sit repellendus voluptas nam eligendi at. Officiis, deserunt velit! Quia a suscipit aliquid iste dolor.</h3>

        <Link to='/dashboard'>Get Started</Link>

        {/* <button onClick={test}>TEST BE AUTH</button> */}
      </div>

      <div className="right">
        <div className="imgContainer">
            {/* THIS div IS FOR THE ANIMATED BACKGROUND */}
          <div className="bgContainer">
            {/* THIS div CONTAINS THE img TO BE ANIMATED */}
            <div className="bg"></div>
          </div>

          <img src="/bot.png" alt="" className='bot' />

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
                  "Human: We produce food for Mice",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Bot: We produce food for Hamsters",
                  2000,
                  () => {
                    setTypingStatus("human2");
                  },
                  "Human2: We produce food for Guinea Pigs",
                  2000,
                  () => {
                    setTypingStatus("bot");
                  },
                  "Bot: We produce food for Chinchillas",
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

      <div className="terms">
        <img src="/logo.png" alt="" />

        <div className="links">
          <Link to='/'>Terms of Service</Link>
          <span> | </span>
          <Link to='/'>Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage