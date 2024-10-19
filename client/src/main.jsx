import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/Homepage"
import DashboardPage from "./routes/dashboardPage/DashboardPage"
import ChatPage from "./routes/chatPage/ChatPage"

import SigninPage from "./routes/signinPage/SigninPage";
import SignUpPage from "./routes/signUpPage/SignUpPage";

import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import './index.css'


const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {
        path:"/",
        element: <HomePage/>,
      },
      {
        path:"/sign-in/*",
        element: <SigninPage/>,
      },
      {
        path:"/sign-up/*",
        element: <SignUpPage/>,
      },
      {
        element: <DashboardLayout/>,
        children:[
          {
            path: "/dashboard",
            element:<DashboardPage/>
          },
          {
            path:"/dashboard/chats/:id",
            element: <ChatPage/>
          }

        ]
      }
    ],
 
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
