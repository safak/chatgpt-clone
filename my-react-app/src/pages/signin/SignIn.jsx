import React, { useEffect } from 'react';
import { SignInButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');  // Navigate to dashboard if already signed in
    }
  }, [isSignedIn, navigate]);

  return (
    <main>
      <div>
        <SignInButton path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </main>
  );
}

export default SignInPage;
