import React, { useEffect } from 'react';
import { SignIn, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className=" ">
      <div className="">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up" // Link to your custom sign-up route
        />
      </div>
    </div>
  );
}

export default SignInPage;
