import { SignUp } from '@clerk/clerk-react'
import './signuppage.css';
import React from 'react'

const SignupPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path='/sign-up' signInUrl="/sign-in"/>
    </div>
  )
}

export default SignupPage
