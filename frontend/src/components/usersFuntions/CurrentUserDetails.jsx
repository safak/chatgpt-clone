// import React, { useEffect, useState } from "react";
// import VideoService from "../../AserverAuth/config.js";

// function CurrentUserDetails() {
//   const [userDetails, setUserDetails] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const user = await VideoService.getCurrentUser();
//         setUserDetails(user);
//       } catch (err) {
//         setError(err.message || "Failed to fetch user details.");
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   return (
//     <div className="p-6 bg-white rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-gray-800">User Details</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {userDetails ? (
//         <div className="space-y-4">
//           {/* Display user avatar */}
//           <div className="flex items-center space-x-4">
//             <img
//               src={userDetails.avatar}
//               alt={`${userDetails.fullname}'s Avatar`}
//               className="w-16 h-16 rounded-full object-cover shadow"
//             />
//             <p className="text-gray-700">
//               <strong>{userDetails.fullname}</strong>
//             </p>
//           </div>
//           <p>
//             <strong>Email:</strong> {userDetails.email}
//           </p>
//           <p>
//             <strong>User Name:</strong> {userDetails.username}
//           </p>
//           <p>
//             <strong>Account Created At:</strong> {userDetails.createdAt}
//           </p>
//           <p>
//             <strong>ID:</strong> {userDetails._id}
//           </p>
//         </div>
//       ) : (
//         <p>Loading user details...</p>
//       )}
//     </div>
//   );
// }

// export default CurrentUserDetails;



import React, { useEffect, useState } from "react";
import VideoService from "../../AserverAuth/config.js";

function CurrentUserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await VideoService.getCurrentUser();
        setUserDetails(user);
      } catch (err) {
        setError(err.message || "Failed to fetch user details.");
      }
    };

    fetchUserDetails();
  }, []);

  // Function to format timestamp to Pakistan Standard Time (PKT)
  const formatDateToPKT = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi"
    }).format(date);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Current User Details</h2>
      {error && <p className="text-red-500">{error}</p>}
      {userDetails ? (
        <div className="space-y-4">
          {/* Display user avatar */}
          <div className="flex items-center space-x-4">
            <img
              src={userDetails.avatar}
              alt={`${userDetails.fullname}'s Avatar`}
              className="w-16 h-16 rounded-full object-cover shadow"
            />
            <p className="text-gray-700">
              <strong>{userDetails.fullname}</strong>
            </p>
          </div>
          <p>
            <strong>Email:</strong> {userDetails.email}
          </p>
          <p>
            <strong>User Name:</strong> {userDetails.username}
          </p>
          <p>
            <strong>ID:</strong> {userDetails._id}
          </p>
          {/* Display the formatted "updatedAt" timestamp */}
          <p>
            <strong>Account Created:</strong> {formatDateToPKT(userDetails.createdAt)}
          </p>
          <p>
            <strong>Last Updated:</strong> {formatDateToPKT(userDetails.updatedAt)}
          </p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default CurrentUserDetails;
