import React from "react";
import "./rootLayout.css";
import { Link, Outlet } from "react-router-dom";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/react";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <header>
        <Link to="/" className="brand">
          <img src="logo.png" alt="AI logo" className="logo" />
          <span className="github-text">AI</span>
        </Link>
        <div className="authButtons">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button type="button">Sign in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button type="button">Sign up</button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
