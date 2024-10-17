import './signinPage.css'
import { SignIn } from '@clerk/clerk-react'

 const SigninPage = () => {
  return (
    <div className="SigninPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard"/>
    </div>
  );
};

export default SigninPage;