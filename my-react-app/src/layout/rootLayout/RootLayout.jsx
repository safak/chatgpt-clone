import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function RootLayout() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className="p-1 h-screen w-full bg-gradient-to-l from-gray-800 via-black to-gray-900"> {/* Dark linear gradient */}
        <header className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-md shadow-md">
          {/* Logo Section */}
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
          <div className="text-pink-800 font-bold">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex justify-center items-center mt-2 h-full">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
}

export default RootLayout;
