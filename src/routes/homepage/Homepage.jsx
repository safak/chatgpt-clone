import { Link } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  return (
    <div className="Homepage">
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Homepage;
