import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import ChatList from "../components/chatlist/ChatList";
import { useSidebar } from "../contexts/SidebarContext"; // Import the context
import authService from '../AserverAuth/auth';
import ToastNotification from '../components/toastNotification/ToastNotification';
import { useSelector } from 'react-redux';
import DashboardContent from './DashBoardContent';

// Custom Dashboard Component
const DashboardComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-600">Here you can upload your PDFs and interact with your chatbot.</p>
      <div className="mt-8">
        {/* Example Animation or Content */}
        <div className="w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status
  const [isUserLoggedOut, setIsUserLoggedOut] = useState(false); // Track logout status
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen } = useSidebar(); // Access global state
  const [toastMessage, setToastMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const fileName = useSelector((state) => state.file?.currentFileData?.fileName || null);
  const erroUpload = useSelector((state) => state.file?.fileUploadError || null);

  // Handle toast notification when fileName changes
  useEffect(() => {
    if (fileName) {
      setToastMessage(`File "${fileName}" uploaded successfully!`);
      setIsError(false);
    }
    if (erroUpload === true) {
      setIsError(true);
      setToastMessage(`Error uploading file. Try again.`);
    }
  }, [fileName, erroUpload]);

  const handleLogout = () => {
    setIsUserLoggedOut(true); // Set the state to reflect that the user is logged out
    navigate("/login");
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []); // Only run once when the component mounts

  useEffect(() => {
    if (isUserLoggedOut) {
      navigate('/login'); // Navigate to login page when logged out
    }
  }, [isUserLoggedOut, navigate]); // This effect only runs when the user logs out

  if (isAuthenticated === null) return <div className="text-black">Loading....</div>;

  const isDashboardHome = location.pathname === "/dashboard" ;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="lg:w-1/8 bg-[#fff4f4] text-gray transition-all duration-300">
        <ChatList onLogout={handleLogout} /> {/* Pass the handleLogout function as a prop */}
      </aside>

      {/* Main Content Area */}
      <main
        className={`flex-1 bg-white text-gray-200 ${isSidebarOpen ? 'ml-1/4' : 'ml-0'} lg:ml-1/4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
      >
        <div>{isDashboardHome ? <DashboardContent /> : <Outlet />}</div>
      </main>

      {toastMessage && (
        <div className="fixed top-0 left-0 w-full flex justify-center z-50">
          <ToastNotification
            message={toastMessage}
            duration={3000}
            isSuccess={!isError}
          />
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
