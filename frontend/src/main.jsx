import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { AuthLayout } from './components';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import DashboardLayout from './dashboard/DashboardLayout.jsx';
import Settings from './pages/Settings.jsx';
import Info from './info/Info.jsx';
import UploadPdf from './chroma/UploadPdf.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          ),
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup />
            </AuthLayout>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <AuthLayout authentication>
              <DashboardLayout />
            </AuthLayout>
          ),
          children: [
            {
              path: "/dashboard/chat",
              element: <Dashboard />, // Main dashboard/chat component
            },
            {
              path: "/dashboard/uploadpdf",
              element: <UploadPdf />, // Upload PDF component
            },
            {
              path: "/dashboard/settings",
              element: <Settings />, // Settings component
            },
            {
              path: "/dashboard/info",
              element: <Info />, // Info component
            },
          ],
        },
      
        {
          path: "/forgot-password",
          element: <ForgetPassword />,
        },
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
  