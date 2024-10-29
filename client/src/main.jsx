import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter ,RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/Homepage";
import DashboardPage from "./routes/dashboardPage/DashboardPage";
import ChatPage from "./routes/chatPage/ChatPage";

import SigninPage from "./routes/signinPage/SigninPage";
import SignUpPage from "./routes/signUpPage/SignUpPage";

import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import './index.css';

/**
 * Main entry point for the React application using Vite and React Router DOM.
 * 
 * This code sets up routing for the web application, which includes the following routes and layouts:
 * 
 * - **RootLayout**: The main layout component, wrapping around child components, including home, sign-in, and sign-up pages.
 * - **HomePage**: Displayed when navigating to the root ("/") of the application.
 * - **SigninPage**: Displayed when navigating to the "/sign-in" route for user authentication.
 * - **SignUpPage**: Displayed when navigating to the "/sign-up" route for user registration.
 * - **DashboardLayout**: This layout is used for pages under the "/dashboard" path. Contains:
 *    - **DashboardPage**: Displayed when navigating to "/dashboard", acting as the main page of the user’s dashboard.
 *    - **ChatPage**: Displayed when navigating to a specific chat at "/dashboard/chats/:id", where `id` is a dynamic route parameter.
 * 
 * The app uses `createBrowserRouter` to handle navigation between these pages and layouts.
 * 
 * The rendering of the entire application is done by targeting the root element in the HTML file.
 * 
 * - **ReactDOM.createRoot**: This function mounts the React app to the HTML element with the ID `root`.
 * - **RouterProvider**: This component wraps the routing system, passing the `router` object to manage route changes and page navigation.
 * 
 * Key Technologies:
 * - **React**: JavaScript library for building the UI.
 * - **React Router DOM**: Handles client-side navigation without refreshing the page.
 * - **Vite**: Fast build tool for modern web projects, used for development.
 */




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
);
