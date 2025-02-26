import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './routes/chatPage/ChatPage';
import Dashboard from './routes/dashrboard/Dashboard';
import Homepage from './routes/homepage/Homepage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;