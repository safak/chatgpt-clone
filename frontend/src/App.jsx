// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Homepage from "./pages/home/Home";
// import Dashboard from "./pages/dashboard/Dashboard";
// import ChatPage from "./pages/chatpage/ChatPage";
// import RootLayout from "./layout/rootLayout/RootLayout";
// import DashboardLayout from "./layout/dashBoardLayout/DashboardLayout";
// import { SignIn, SignUp } from "@clerk/clerk-react";
// import { SidebarProvider } from "./contexts/SidebarContext";
// import { ImageProvider } from "./contexts/ImageContext";  // Import ImageProvider
// import { LoadingProvider } from "./contexts/LoadingContext";  // Import LoadingProvider
// import UploadPdf from "./pages/chroma/UploadPdf";

// const App = () => {
//   return (
//     <LoadingProvider> {/* Wrap the app with LoadingProvider */}
//       <ImageProvider> {/* Wrap the app with ImageProvider */}
//         <SidebarProvider> {/* Wrap the app with SidebarProvider */}
//           <div className="app">
//             <Routes>
//               {/* Redirect from root to "/home" */}
//               <Route path="/" element={<Navigate to="/home" replace />} />

//               {/* RootLayout wraps all other routes */}
//               <Route path="/" element={<RootLayout />}>
//                 <Route path="home" element={<Homepage />} /> {/* Homepage route */}
//                 <Route path="sign-in" element={<SignIn redirectUrl="/dashboard" />} />
//                 <Route path="sign-up" element={<SignUp redirectUrl="/dashboard" />} />

//                 {/* Protected routes, nested inside DashboardLayout */}
//                 <Route element={<DashboardLayout />}>
//                   <Route path="dashboard" element={<Dashboard />} /> {/* Dashboard route */}
//                   <Route path="dashboard/chats/:id" element={<ChatPage />} /> {/* Dynamic Chat page route */}
//                   <Route path="dashboard/upload-pdf" element={<UploadPdf />} /> {/* UploadPdf route */}
//                 </Route>
//               </Route>
//             </Routes>
//           </div>
//         </SidebarProvider>
//       </ImageProvider>
//     </LoadingProvider>
//   );
// };






import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import the Provider
import store from './redux/store';  // Import your Redux store
import Homepage from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import ChatPage from './pages/chatpage/ChatPage';
import RootLayout from './layout/rootLayout/RootLayout';
import DashboardLayout from './layout/dashBoardLayout/DashboardLayout';
import UploadPdf from './pages/chroma/UploadPdf';
import { AuthService } from './services/auth.service';
import SignUpPage from './pages/signup/SignUp';
import SignInPage from './pages/signin/SignIn';

// Import Providers
import { SidebarProvider } from './contexts/SidebarContext';
import { ImageProvider } from './contexts/ImageContext';
import { LoadingProvider } from './contexts/LoadingContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authService = new AuthService();
      try {
        const currentUser = await authService.getCurrentUser();
        setIsAuthenticated(!currentUser); // Update auth state based on current user
      } catch {
        setIsAuthenticated(false); // Set false if user is not authenticated
      }
    };

    checkAuth();
  }, []);

  return (
    <Provider store={store}> {/* Wrap the app with the Redux Provider */}
      <LoadingProvider>
        <ImageProvider>
          <SidebarProvider>
            <div className="app">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/" element={<RootLayout />}>
                  <Route path="home" element={<Homepage />} />
                  {!isAuthenticated ? (
                    <>
                      <Route path="sign-in" element={<SignInPage />} />
                      <Route path="sign-up" element={<SignUpPage />} />
                    </>
                  ) : (
                    <Route element={<DashboardLayout />}>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="dashboard/chats/:id" element={<ChatPage />} />
                      <Route path="dashboard/upload-pdf" element={<UploadPdf />} />
                    </Route>
                  )}
                </Route>
              </Routes>
            </div>
          </SidebarProvider>
        </ImageProvider>
      </LoadingProvider>
    </Provider> 
  );
};

export default App;
