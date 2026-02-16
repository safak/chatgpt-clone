import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import DashboardPage from "./routes/dashboardPage/dashboardPage";
import ChatPage from "./routes/chatPage/chatPage";
import ErrorPage from "./routes/errorPage/errorPage";
import RootLayout from "./layouts/rootLayout/rootLayout";
import DashBoardLayout from "./layouts/dashBoardLayout/dashBoardLayout";

let router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        element: <DashBoardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
