import { Link } from "react-router-dom";
import "./homepage.css";

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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
