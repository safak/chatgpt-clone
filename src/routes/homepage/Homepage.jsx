import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>TOYAI</h1>
        <h2>Supercharge Your Childs Develoment</h2>
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
            <img src="/bot.png" alt="" />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Child: Why is the sky blue?",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Toybot: Because of Rayleigh scattering.",
                1000,
                "Child: Why is the grass green?",
                1000,
                "Toybot: Because of chlorophyll.",
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
