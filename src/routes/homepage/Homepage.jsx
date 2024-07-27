import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="orbital" className="orbital" />
      <div className="left">
        <h1>GenX AI</h1>
        <h2>AI for the next generation</h2>
        <h3>
          GenX AI is a powerful AI ChatBot that can help you with your daily
          tasks.
        </h3>
        <Link to="/dashboard" className="button">
          Get Started
        </Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="chatbot" className="bot" />
          <div className="chat">
            <img src="/bot.png" alt="" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Hi, how are you?",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Bot: I'm good, how can I help you?",
                1000,
                "Human: Can you help me with my homework?",
                1000,
                "Bot: Sure, what do you need help with?",
                1000,
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
  );
};

export default Homepage;
