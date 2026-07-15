import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routes/homePage/HomePage.jsx'
import SinUpPage from './routes/sinUpPage/SinUpPage.jsx'
import SinInPage from './routes/sinInPage/SinInPage.jsx'
import DashboardPage from './routes/dashboardPage/DashboardPage.jsx'
import ChatPage from './routes/chatPage/ChatPage.jsx'
import RootLayout from './layouts/rootLayout/RootLayout.jsx'
import DashboardLayouts from './layouts/dashboardLayouts/DashboardLayouts.jsx'
import { ClerkProvider } from '@clerk/react'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Missing Clerk publishable key')
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/sign-up/*',
        element: <SinUpPage />,
      },
      {
        path: '/sign-in/*',
        element: <SinInPage />,
      },
      {
        element: <DashboardLayouts />,
        children: [{
          path: '/dashboard',
          element: <DashboardPage />,

        },
        {
          path: '/dashboard/chat/:id',
          element: <ChatPage />,
        }
      ] 
      }
     ]

  }])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
)
