import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div>
      <header>
        <Link to="/">
          <img src="/public/logo.png" alt="logo" />
          <span>GenX AI</span>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
