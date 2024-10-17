import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import './dashboardLayout.css';
import ChatList from "../../components/chatList/ChatList";


const DashboardLayout = () => {

  const {userId, isLoaded}= useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoaded && !userId) {
      navigate("/sign-in");
    }

  },[isLoaded, userId, navigate]);

  if(!isLoaded) return "loading...";

  return (
    <div className="DashboardLayout">
        <div classname="menu"><ChatList/> </div>
        <div classname="content"><Outlet/></div>
    </div>
  );
};

export default DashboardLayout;