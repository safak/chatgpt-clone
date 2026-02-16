import { SignIn } from "@clerk/clerk-react";
import "./signInPage.css";

export default function SignInPage() {
  return (
    <div className="signInPage">
      <h1>sign in page</h1>
      <SignIn path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
