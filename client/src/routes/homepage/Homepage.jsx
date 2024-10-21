import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("Child");

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>TOYAI</h1>
        <h2>Supercharge Your Child's Develoment</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam non
          nostrum, beatae a recusandae quae asperiores ipsam ratione?
        </h3>
        <Link to={"/dashboard"}>Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={typingStatus === "Child" ? "/child.jpg" : "bot.png"}
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Child: Why is the sky blue?",
                2000, // Delay before next string
                () => {
                  setTypingStatus("Toybot");
                },
                "Toybot: Because of Rayleigh scattering.",
                2000,
                () => {
                  setTypingStatus("Child");
                },
                "Child: Why is the grass green?",
                2000,
                () => {
                  setTypingStatus("Toybot");
                },
                "Toybot: Because of chlorophyll.",
                2000,
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
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
