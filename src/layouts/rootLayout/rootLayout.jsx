import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <header>
        <Link to="/">
          <img src="/logo.png" alt="logo" />
          <span>DevGPT</span>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
