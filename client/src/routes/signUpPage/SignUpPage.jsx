import './signUpPage.css'
import { SignUp } from '@clerk/clerk-react'

 const SignUpPage = () => {
  return (
    <div className="SignUpPage">
      <SignUp path="/sign-up" signInUrl="sign-in"/>
    </div>
  );
};

export default SignUpPage;