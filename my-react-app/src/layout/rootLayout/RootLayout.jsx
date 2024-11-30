import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

function RootLayout() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const location = useLocation();

  // Check if the current route requires centering
  const shouldCenterOutlet = ["/home", "/sign-in", "/sign-up"].includes(location.pathname);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="p-1 h-screen w-full bg-gradient-to-l from-gray-800 via-black to-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-md">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="35"
              height="35"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="40" fill="#00AEEF" />
              <rect
                x="35"
                y="35"
                width="30"
                height="30"
                fill="#FFF"
                transform="rotate(45 50 50)"
              />
            </svg>
            <span className="font-bold text-lg text-gray-800">chatbot</span>
          </Link>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition duration-300">
                  Sign In
                </button>
              </Link>
            </SignedOut>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={`w-full h-full mt-2 ${
            shouldCenterOutlet ? 'flex justify-center items-center' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
}

export default RootLayout;
