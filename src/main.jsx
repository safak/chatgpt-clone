import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './routes/homePage/HomePage.jsx';
import DashBoard from './routes/dashboardPage/DashboardPage.jsx';
import ChatPage from './routes/chatPage/ChatPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/dashboard/chats/:id',
        element: <ChatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
