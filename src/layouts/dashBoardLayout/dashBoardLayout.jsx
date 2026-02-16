import { Outlet } from "react-router-dom";
import "./dashBoardLayout.css";

const DashBoardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
