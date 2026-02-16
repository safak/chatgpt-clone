import { SignUp } from "@clerk/clerk-react";
import "./signUpPage.css";

export default function SignUpPage() {
  return (
    <div className="signUpPage">
      <h1>sign up page</h1>
      <SignUp path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
