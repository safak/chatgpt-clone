import { Outlet } from 'react-router-dom'
import './dashboardLayout.css'

const DashboardLayout = () => {
  return (
    <div className="DashboardLayout">
        <div classname="menu">MENU </div>
        <div classname="content"><Outlet/></div>
    </div>
  );
};

export default DashboardLayout;