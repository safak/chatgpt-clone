import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/Homepage"
import DashboardPage from "./routes/dashboardPage/DashboardPage"
import ChatPage from "./routes/chatPage/ChatPage"
import RootLayout from './layouts/RootLayout';

import './index.css'
import { Children } from 'react';

const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path: '/',
        element: <HomePage/>
      }
    ]
 
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
