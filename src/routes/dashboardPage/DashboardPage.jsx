import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardPage.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

function DashboardPage() {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout">
      <div className="menu">Menu</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
