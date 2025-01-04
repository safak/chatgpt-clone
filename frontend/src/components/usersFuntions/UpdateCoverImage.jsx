import React from "react";
import VideoService from "../AserverAuth/config";

function UpdateAccountDetails() {
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;

    try {
      const response = await VideoService.updateAccountDetails(fullname, email);
      alert(response.message || "Account updated successfully");
    } catch (error) {
      alert(error.message || "Error updating account");
    }
  };

  return (
    <form onSubmit={handleUpdateAccount}>
      <h2>Update Account Details</h2>
      <label>
        Full Name:
        <input type="text" name="fullname" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateAccountDetails;
