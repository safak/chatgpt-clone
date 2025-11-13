import { SignIn } from "@clerk/clerk-react";
import "./SignInPage.css";

const SignInPage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
};

export default SignInPage;
