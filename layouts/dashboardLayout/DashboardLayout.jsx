import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div>
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
