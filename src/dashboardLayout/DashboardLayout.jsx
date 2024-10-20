import { Outlet, useNavigate } from "react-router-dom";
import "./dashboardLayout.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth(); // This is a hook that gives us access to the user's authentication state. It returns an object with the user's ID and a boolean indicating whether the user's authentication state has been loaded.

  const navigate = useNavigate(); // This is a hook that gives us access to the navigation object

  useEffect(() => {
    // This is a hook that runs when the component mounts
    if (isLoaded && !userId) {
      navigate("/sign-in"); // If the user is not signed in, redirect them to the sign-in page
    }
  }, [isLoaded, userId, navigate]); // eslint-disable-line, our hook only needs to run when these values change

  // if not loaded, we want to display a skeleton
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboardLayout">
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
