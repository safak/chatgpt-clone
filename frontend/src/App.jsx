// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import authService from "./AserverAuth/auth";
// import { setLoginStatus, setUserData, logout } from "./store/authSlice";

// import { Outlet } from "react-router-dom";
// import { ImageProvider } from "./contexts/ImageContext";
// import { LoadingProvider } from "./contexts/LoadingContext";
// import { SidebarProvider } from "./contexts/SidebarContext";
// import ToastNotification from "./components/toastNotification/ToastNotification";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const fileName = useSelector((state) => state.file?.currentFileData?.fileName || null);
//   const dispatch = useDispatch();
//   const [toastMessage, setToastMessage] = useState(null);
//   const [isError, setIsError] = useState(false);

//   // Handle toast notification when fileName changes
//   useEffect(() => {
//     if (fileName) {
//       setToastMessage(`File "${fileName}" uploaded successfully!`);
//       setIsError(false);
//     }
//   }, [fileName]);

//   useEffect(() => {
//     authService
//       .getCurrentUser()
//       .then((userData) => {
//         if (userData) {
//           dispatch(setLoginStatus(true)); // Assuming `setLoginStatus` expects a boolean
//           dispatch(setUserData(userData)); // Pass user data directly
//         } else {
//           dispatch(logout());
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching current user:", error);
//         setError(error.message || "Failed to load user data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [dispatch]);

//   return (
//     <ImageProvider> {/* Wrap the entire app with ImageProvider */}
//       <LoadingProvider> {/* Wrap inside LoadingProvider */}
//         <SidebarProvider> {/* Wrap inside SidebarProvider */}
//           {/* ToastNotification positioned absolutely */}
//           {toastMessage && (
//             <div className="fixed top-0 left-0 w-full flex justify-center z-50">
//               <ToastNotification
//                 message={toastMessage}
//                 duration={3000}
//                 isSuccess={!isError}
//                 onClose={() => setToastMessage(null)} // Clear toast on close
//               />
//             </div>
//           )}
//           <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
//             <main className="flex flex-grow flex-col">
//               {loading ? (
//                 <p className="text-blue-600 text-lg animate-pulse">Loading...</p>
//               ) : error ? (
//                 <p className="text-red-600 bg-red-100 p-2 rounded-lg">
//                   Error: {error}
//                 </p>
//               ) : (
//                 <Outlet /> // Render child routes here
//               )}
//             </main>
//           </div>
//         </SidebarProvider>
//       </LoadingProvider>
//     </ImageProvider>
//   );
// }


// export default App;













import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./AserverAuth/auth";
import { setLoginStatus, setUserData, logout } from "./store/authSlice";

import { Outlet } from "react-router-dom";
import { ImageProvider } from "./contexts/ImageContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(setLoginStatus(true)); // Assuming `setLoginStatus` expects a boolean
          dispatch(setUserData(userData)); // Pass user data directly
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
        setError(error.message || "Failed to load user data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <ImageProvider>
      <LoadingProvider>
        <SidebarProvider>
          <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
            <main className="flex flex-grow flex-col">
              {loading ? (
                <p className="text-blue-600 text-lg animate-pulse">Loading...</p>
              ) : error ? (
                <p className="text-red-600 bg-red-100 p-2 rounded-lg">
                  Error: {error}
                </p>
              ) : (
                <Outlet /> // Render child routes here
              )}
            </main>
          </div>
        </SidebarProvider>
      </LoadingProvider>
    </ImageProvider>
  );
}

export default App;
