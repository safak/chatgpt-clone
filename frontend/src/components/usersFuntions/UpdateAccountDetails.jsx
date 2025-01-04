import React from "react";
import VideoService from "../../AserverAuth/config.js";

function UpdateAccountDetails() {
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;

    // Check if at least one field is provided
    if (!fullname && !email) {
      alert("Please enter at least one detail (Full Name or Email).");
      return;
    }

    try {
      const response = await VideoService.updateAccountDetails(fullname, email);
      if (response && response.message) {
        alert(response.message || "Account updated successfully");
      }
    } catch (error) {
      // Handle specific error response
      if (error.message === "The email address is already in use.") {
        alert("The email address is already in use. Please try another one.");
      } else {
        alert(error.message || "Error updating account");
      }
    }
  };

  return (
    <form
      onSubmit={handleUpdateAccount}
      className="space-y-6 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Enter any one detail to update your account
      </h2>
      <div>
        <label className="block text-gray-700 mb-1">Full Name:</label>
        <input
          type="text"
          name="fullname"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email:</label>
        <input
          type="email"
          name="email"
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

export default UpdateAccountDetails;
