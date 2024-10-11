import * as React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import "./index.css";
import RootLayout from "../src/layouts/rootLayout/RootLayout.jsx";
import HomePage from "../src/routes/homepage/HomePage.jsx";
import DashboardPage from "../src/routes/dashboardPage/DashboardPage.jsx";
import ChatPage from "./routes/chatPage/ChatPage";
import DashboardLayout from "../src/layouts/dashboardLayout/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
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

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
