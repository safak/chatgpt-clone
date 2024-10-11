import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";

function DashboardLayout() {
  return (
    <div>
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
