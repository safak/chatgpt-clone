import { Link } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="bg-home" className="orbital" />
      {/* Left Side */}
      <div className="left">
        <h1>BYZAI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Your AI Assistant for intelligent conversation, content generation,
          and instant answers.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      {/* Right Side */}
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="bot" className="bot" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
