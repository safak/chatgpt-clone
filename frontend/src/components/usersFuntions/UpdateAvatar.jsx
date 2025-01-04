import React from "react";
import VideoService from "../../AserverAuth/config.js";

function UpdateAvatar() {
  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    const file = e.target.avatar.files[0];

    try {
      const response = await VideoService.updateUserAvatar(file);
      alert(response.message || "Avatar updated successfully");
    } catch (error) {
      alert(error.message || "Error updating avatar");
    }
  };

  return (
    <form
      onSubmit={handleUpdateAvatar}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Update Avatar</h2>
      <div>
        <label className="block text-gray-700 mb-1">Upload Avatar:</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
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

export default UpdateAvatar;
