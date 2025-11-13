import { Link, Outlet } from "react-router-dom";
import "./RootLayout.css";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/">
          <img src="/logo.png" className="logo" alt="logo" />
          <span>BYZAI</span>
        </Link>
      </header>
      <main>
        <Outlet /> {/* buraya child route render edilir */}
      </main>
    </div>
  );
};

export default RootLayout;
