import React, { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      console.log('Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Dark mode disabled');
    }
  };
  

  return (
    <div className="min-h-screen p-4 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <button
        onClick={toggleDarkMode}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
      >
        Toggle Dark Mode
      </button>
      <h1 className="text-3xl font-bold">Welcome to Vite + React + Tailwind</h1>
      <p className="mt-2 text-lg">
        This is a lightweight Vite setup with Tailwind and a dark mode toggle.
      </p>
    </div>
  );
};

export default App;
