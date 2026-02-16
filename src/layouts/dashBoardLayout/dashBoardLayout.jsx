import { Outlet, useNavigate } from "react-router-dom";
import "./dashBoardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const DashBoardLayout = () => {
  const { isLoaded, userId } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (isLoaded) return <h1>Loading...</h1>;

  console.log("userId", userId);
  console.log("isLoaded", isLoaded);

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
