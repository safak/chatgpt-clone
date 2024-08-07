import { Outlet } from 'react-router-dom';
import './dashboardLayout.css';

const DashBoardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
