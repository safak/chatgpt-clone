import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import './rootLayout.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    // ADDED HERE INSTEAD OF main.jsx BC WE ARE USING react-router-dom
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default RootLayout