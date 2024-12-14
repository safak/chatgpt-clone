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
//                 </Route>
//               </Route>
//             </Routes>
//           </div>
//         </SidebarProvider>
//       </ImageProvider>
//     </LoadingProvider>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatPage from "./pages/chatpage/ChatPage";
import RootLayout from "./layout/rootLayout/RootLayout";
import DashboardLayout from "./layout/dashBoardLayout/DashboardLayout";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ImageProvider } from "./contexts/ImageContext";  // Import ImageProvider
import { LoadingProvider } from "./contexts/LoadingContext";  // Import LoadingProvider
import UploadPdf from "./pages/chroma/UploadPdf";

const App = () => {
  return (
    <LoadingProvider> {/* Wrap the app with LoadingProvider */}
      <ImageProvider> {/* Wrap the app with ImageProvider */}
        <SidebarProvider> {/* Wrap the app with SidebarProvider */}
          <div className="app">
            <Routes>
              {/* Redirect from root to "/home" */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* RootLayout wraps all other routes */}
              <Route path="/" element={<RootLayout />}>
                <Route path="home" element={<Homepage />} /> {/* Homepage route */}
                <Route path="sign-in" element={<SignIn redirectUrl="/dashboard" />} />
                <Route path="sign-up" element={<SignUp redirectUrl="/dashboard" />} />

                {/* Protected routes, nested inside DashboardLayout */}
                <Route element={<DashboardLayout />}>
                  <Route path="dashboard" element={<Dashboard />} /> {/* Dashboard route */}
                  <Route path="dashboard/chats/:id" element={<ChatPage />} /> {/* Dynamic Chat page route */}
                  <Route path="dashboard/upload-pdf" element={<UploadPdf />} /> {/* UploadPdf route */}
                </Route>
              </Route>
            </Routes>
          </div>
        </SidebarProvider>
      </ImageProvider>
    </LoadingProvider>
  );
};

export default App;
