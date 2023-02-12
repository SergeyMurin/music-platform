import React from "react";
import { GoogleSignIn } from "../google/google.sign.in";
import { SignUpForm } from "./sign.up.form";
import { Link } from "react-router-dom";

export const SignUp: React.FC = () => {
  return (
    <div>
      <SignUpForm />
      <GoogleSignIn />
      <Link to={"/sign-in"} replace={true}>
        Sign In
      </Link>
    </div>
  );
};
