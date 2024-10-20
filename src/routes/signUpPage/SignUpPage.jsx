import "./signUpPage.css";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/sign-up" />
    </div>
  );
};

export default SignUpPage;
