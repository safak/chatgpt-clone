import React from 'react';
import { useSelector } from 'react-redux';


function ProfileHeader() {
  const user = useSelector((state) => state.auth.userData);
  

  if (!user) return null; // Ensure user data exists before rendering
  
  return (
 
    
    <>
    <div className="relative bg-white-400 bg-opacity-60 p-1 "> {/* Background with opacity */}
  <img
    src={user.coverImage || 'https://res.cloudinary.com/dk06hi9th/image/upload/v1732198259/dbkm9wciwhs8njns81de.jpg'}
    alt="Cover"
    className="w-full h-48 object-cover r"
  />
  {/* Profile Image in Circle */}
  <div className="absolute left-0 right-0 bottom-0 flex justify-center">
    <img
      src={user.avatar || 'https://res.cloudinary.com/dk06hi9th/image/upload/v1732198388/zgwzdyhy3nldkk2inxpl.jpg'}
      alt="Profile"
      className="w-24 h-24 rounded-full border-4 border-white -mb-12 object-cover"
    />
  </div>
</div>

{/* Profile Info Section */}
<div className="text-center mt-12">
  <h1 className="text-3xl font-semibold text-black">{user.username}</h1> {/* White text for contrast */}
</div>

    </>
  // </div>
// </header>

  );
}

export default ProfileHeader;
