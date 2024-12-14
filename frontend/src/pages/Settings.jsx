import React, { useState } from "react";
import { ChangePassword, UpdateAvatar, UpdateAccountDetails, CurrentUserDetails } from "../components";

function Settings() {
  const [currentView, setCurrentView] = useState(null); // Track which functionality is active

  // Render different sections based on `currentView`
  const renderView = () => {
    switch (currentView) {
      case "changePassword":
        return <ChangePassword />;
      case "updateAccount":
        return <UpdateAccountDetails />;
      case "updateAvatar":
        return <UpdateAvatar />;
      case "currentUser": // Rendering condition for "View Current User"
        return <CurrentUserDetails />;
      default:
        return <p className="text-gray-600 text-center">Select an action to get started.</p>;
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setCurrentView("changePassword")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Change Password
        </button>
        <button
          onClick={() => setCurrentView("updateAccount")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Account Details
        </button>
        <button
          onClick={() => setCurrentView("updateAvatar")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Avatar
        </button>
        <button
          onClick={() => setCurrentView("currentUser")} // Button for viewing the current user
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Current User
        </button>
      </div>
      {/* Render the view based on the current selection */}
      <div className="bg-white p-6 rounded shadow-md">{renderView()}</div>
    </div>
  );
}

export default Settings;
