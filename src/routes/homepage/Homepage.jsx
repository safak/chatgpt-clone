import { useState } from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  const [typeingStatus, setTypingStatus] = useState("human1");


  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>ARDO AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi,
          odio fugiat! Tempora, asperiores quos!
        </h3>
        <Link to="/dashboard">Get Started</Link>

      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typeingStatus === "human1"
                  ? "/human1.jpeg"
                  : typeingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human:Lorem ipsum, dolor sit amet consectetur",
                1000,
                () => {
                  setTypingStatus("robot");
                },
                "Robot:Lorem ipsum, dolor sit amet consecteturs",
                1000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2:Lorem ipsum, dolor sit amet consectetur",
                1000,
                () => {
                  setTypingStatus("robot");
                },
                "Robot:Lorem ipsum, dolor sit amet consectetur",
                1000,
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
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
