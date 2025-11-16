import { Outlet, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatList from "../../components/ChatList/ChatList";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if not authenticated
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) {
    return (
      <div className="loading">
        <img src="/loading.gif" alt="loading gif" />
      </div>
    );
  }

  return (
    <div className="dashboardLayout">
      <div className="menu">
        <ChatList />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
