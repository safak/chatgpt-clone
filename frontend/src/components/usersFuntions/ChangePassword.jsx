import React from "react";
import VideoService from "../../AserverAuth/config.js";

function ChangePassword() {
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    try {
      const response = await VideoService.changeCurrentPassword(
        oldPassword,
        newPassword
      );
      alert(response.message || "Password changed successfully");
    } catch (error) {
      alert(error.message || "Error changing password");
    }
  };

  return (
    <form
      onSubmit={handleChangePassword}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Change Password</h2>
      <div>
        <label className="block text-gray-700 mb-1">Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">New Password:</label>
        <input
          type="password"
          name="newPassword"
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default ChangePassword;
