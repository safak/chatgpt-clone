import { ClerkProvider, SignedIn, UserButton} from '@clerk/clerk-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
  // Import your publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }
  const queryClient = new QueryClient()  
const rootLayout = () => {
 

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-black shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo or Brand Name */}
            <div className="text-2xl font-extrabold text-white hover:text-blue-500 transition">
              <Link to="/">
               YourLogo
              </Link>
            </div>
            {/* User Sign In Icon */}
            <div className="md:flex space-x-4 items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
    </QueryClientProvider>
  </ClerkProvider>
)
}

export default rootLayout
