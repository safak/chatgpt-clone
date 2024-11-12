import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from "./layouts/rootlayouts/RootLayout.jsx";
import HomePage from './pages/homepage/HomePage.jsx';
import DashboardLayout from './layouts/dashboardlayout/DashboardLayout.jsx';
import DashBoard from './pages/dashboard/DashBoard.jsx';
import ChatPage from './pages/chatpage/ChatPage.jsx';
import SigninPage from './pages/signinpage/SigninPage.jsx';
import SignupPage from './pages/signuppage/SignupPage.jsx';



//raect-router-dom
const router = createBrowserRouter([
  {
   element: <RootLayout/>,
   children:[
    {
      path:"/",
      element:<HomePage/>,
    },
    {
       path:"/sign-in/*",
       element:<SigninPage/>,
    },
    {
      path:"/sign-up/*",
      element:<SignupPage/>,
    },
    {
      element:<DashboardLayout/>,
      children:[
      {
        path:"/dashboard",
        element:<DashBoard/>,
      },
      {
        path:"/dashboard/chats/:id",
        element:<ChatPage/>,
      }

      ],
    }
   ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
   <RouterProvider router={router} />
  </React.StrictMode>,
)
