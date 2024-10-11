import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";
import "./index.css";
import HomePage from "../src/routes/homepage/HomePage.jsx";
import Dashboard from "../src/routes/dashboardPage/DashboardPage.jsx";
import ChatPage from "./routes/chatPage/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [{ path: "/dashboard/chats/:id", element: <ChatPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
