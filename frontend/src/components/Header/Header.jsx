import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData); // Assuming `user.image` contains the profile picture URL
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-2 px-2">
        {/* App Title */}
        <h1
          className="text-2xl font-semibold text-gray-700 hover:cursor-pointer"
          onClick={() => navigate('/')}
        >
          From Watch To Work
        </h1>

        {/* User Profile or Login/Signup Buttons */}
        <div>
          {authStatus && user ? (
            <img
              src={user.avatar || 'https://via.placeholder.com/40'} // Placeholder image if no user image is available
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              onClick={() => navigate('/')} // Redirect to profile page on click
            />
          ) : (
            <div className="space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
