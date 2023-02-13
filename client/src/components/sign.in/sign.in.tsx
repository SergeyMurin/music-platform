import React, { useState } from "react";
import { GoogleSignIn } from "../google/google.sign.in";
import { SignInForm } from "./sign.in.form";
import { Link } from "react-router-dom";

export const SignIn: React.FC = () => {
  return (
    <div>
      <SignInForm />
      <GoogleSignIn />
      <Link to={"/sign-up"} replace={true}>
        Sign Up
      </Link>
    </div>
  );
};
