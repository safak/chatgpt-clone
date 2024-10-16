import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import router from "./router"; // Ensure you have this import for the router
import Homepage from "./routes/homepage/Homepage";
import ChatPage from "./routes/chatPage/ChatPage";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import RootLayout from "./layouts/rootLayout/RootLayout";
import DashboardLayout from "./dashboardLayout/DashboardLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Homepage /> },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

console.log(`React version: ${React.version}`);
