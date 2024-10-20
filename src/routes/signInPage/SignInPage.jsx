import "./signInPage.css";
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" />
    </div>
  );
};

export default SignInPage;
