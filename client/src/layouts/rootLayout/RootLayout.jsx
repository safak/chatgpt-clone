import { Link,Outlet } from 'react-router-dom';
import './rootLayout.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


/**
 * Root layout component that defines the overall structure and global providers of the application.
 *
 * This component:
 * 1. Wraps the application in the **ClerkProvider** for authentication management.
 * 2. Configures **React Query** for data fetching with the QueryClientProvider.
 * 3. Sets up a responsive navigation bar with a logo linking to the homepage and user authentication controls.
 * 4. Renders children elements using the **Outlet** component for routing between pages.
 *
 * ### Key Imports and Providers:
 * - **ClerkProvider**: Provides user authentication context using Clerk.
 * - **QueryClientProvider**: Manages caching and data fetching with React Query.
 * - **SignedIn**: Conditional rendering for displaying user-specific components when signed in.
 * - **UserButton**: Displays the user profile picture and a dropdown for account options.
 *
 * ### Environment Variables:
 * - **PUBLISHABLE_KEY**: Environment variable for the Clerk publishable key, required for authentication setup.
 *
 * ### Throws:
 * - An error if `PUBLISHABLE_KEY` is missing to ensure secure authentication configuration.
 *
 * <RootLayout />
 */

/**
 * Environment variable holding the Clerk publishable key.
 * Throws an error if not provided.
 * @constant
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Initializes a new QueryClient instance to manage React Query caching and data fetching
const queryClient = new QueryClient()

/**
 * RootLayout Component
 * 
 * Provides a foundational layout for the application, including:
 * - Clerk authentication with `ClerkProvider`.
 * - Query management with `QueryClientProvider`.
 * - A header with a logo and user icon.
 * - An outlet to render nested routes.
 * 
 * @component
 * @returns {JSX.Element} The root layout structure with navigation and user context.
 */
const RootLayout = () => {

  return (

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className='rootLayout'>
          <header>
            <Link to="/" className="logo">
              <img src="/logo.png" alt="" />
              <span> MELLER AI</span>
            </Link>
            <div className= "user">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet/>
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};
export default RootLayout;