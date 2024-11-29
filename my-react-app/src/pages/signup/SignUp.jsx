import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md">
        <SignUp path="/sign-up" routing="path" signInUrl="sign-in" />
      </div>
    </div>
  );
}

export default SignUpPage;
