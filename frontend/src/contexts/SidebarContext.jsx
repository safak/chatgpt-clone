import React, { createContext, useContext, useState } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Custom hook to use Sidebar context
export const useSidebar = () => {
  return useContext(SidebarContext);
};

// Sidebar provider component
export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newChat, setNewChat] = useState(false); // Track if new chat is initiated

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleNewChat = () => {
    setNewChat(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, newChat, toggleNewChat }}>
      {children}
    </SidebarContext.Provider>
  );
};
