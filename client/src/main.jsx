import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from './routes/homepage/HomePage'
import Dashboard from './routes/dashboard/Dashboard'
import Chatpage from './routes/chatPage/ChatPage'
import RootLayout from './layouts/rootLayout/RootLayout'
import DashBoardLayout from './layouts/dashboardLayout/DashBoardLayout'
import SignInPage from './routes/signInPage/SignInPage.jsx'
import SignUpPage from './routes/signUpPage/SignUpPage.jsx'




const router = createBrowserRouter([
  {
   element:<RootLayout/>,
   children:[
    {path:"/",element:<Homepage/>},
    {path:"/sign-in/*",element:<SignInPage/>},
    {path:"/sign-up/*",element:<SignUpPage/>},
    
    {
      element:<DashBoardLayout/>,
      children:[
      {path:"/dashboard",element:<Dashboard/>},
      {path:"/dashboard/chats/:id",element:<Chatpage/>},
      ]
    }
   ]
  },
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
