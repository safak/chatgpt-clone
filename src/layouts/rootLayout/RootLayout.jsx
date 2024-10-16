import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      RootLayout
      <header>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>TOYAI</span>
        </Link>
        <div className="user">User</div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
