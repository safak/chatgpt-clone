import { SignIn } from '@clerk/clerk-react'
import "./signinpage.css";
import React from 'react'

const SigninPage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/"/>
    </div>
  )
}

export default SigninPage
