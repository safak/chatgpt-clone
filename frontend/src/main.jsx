import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";  // Redux Provider for state management
import store from "./redux/store";  // Your Redux store
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for navigation
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Router for defining routes
import App from "./App";  // Your main App component
import { AuthService } from "./services/auth.service";
import Homepage from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatPage from "./pages/chatpage/ChatPage";
import SignUpPage from "./pages/signup/SignUp";
import SignInPage from "./pages/signin/SignIn";
import RootLayout from "./layout/rootLayout/RootLayout";
import DashboardLayout from "./layout/dashBoardLayout/DashboardLayout";
import UploadPdf from "./pages/chroma/UploadPdf";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,  // Main App component
    children: [
      {
        path: "/home",
        element: <Homepage />,  // Homepage route
      },
      {
        path: "/sign-in",
        element: <SignInPage />,  // Sign-in page route
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,  // Sign-up page route
      },
      {
        path: "/dashboard",
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),  // Dashboard route wrapped with DashboardLayout
      },
      {
        path: "/dashboard/chats/:id",
        element: <ChatPage />,  // Chat page route
      },
      {
        path: "/dashboard/upload-pdf",
        element: <UploadPdf />,  // Upload PDF route
      },
    ],
  },
]);

// Render the application with RouterProvider and Redux store
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />  {/* Pass the router to RouterProvider */}
    </Provider>
  </React.StrictMode>
);
