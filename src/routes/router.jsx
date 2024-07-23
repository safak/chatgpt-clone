import { createBrowserRouter } from 'react-router-dom';
import { ChatPage, DashboardPage, HomePage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    children: [
      { index: true, element: <DashboardPage /> },
      {
        path: '/dashboard/chats/:id',
        element: <ChatPage />,
      },
    ],
  },
  {
    path: '/',
    element: <HomePage />,
  },
]);
