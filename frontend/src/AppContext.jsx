import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Create the provider
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for user data
  const [theme, setTheme] = useState("light"); // Example for theme toggle

  // Example function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider value={{ user, setUser, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};
