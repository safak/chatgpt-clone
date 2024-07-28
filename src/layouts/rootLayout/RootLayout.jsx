import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

import './rootLayout.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const RootLayout = () => {
  return (
    // ADDED HERE INSTEAD OF main.jsx BC WE ARE USING react-router-dom
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <div className='rootLayout'>
        <header>
          <Link to='/' className='logo'>
            <img src="/logo.png" alt="" />
            <span>AI Chat</span>
          </Link>

          <div className="user">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout