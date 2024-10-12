import { Link } from "react-router-dom";
import "./homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Homepage;
