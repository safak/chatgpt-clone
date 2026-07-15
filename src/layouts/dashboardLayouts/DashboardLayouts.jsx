import React from "react";
import "./dashboardLayouts.css";

const DashboardLayouts = () => {
  const [useId,isLoggedIn] = useAuth();
  const  navigate = userNavigation();

   useEffect(() => {
    if (isLoggedIn && useId) {
      navigate("/sin-in");
      
    }
  }, [isLoggedIn, useId, navigate ]);
 
    if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      <div className="menu">MENU</div>
      <div className="content">content</div>
    </div>
  );
};

export default DashboardLayouts;
