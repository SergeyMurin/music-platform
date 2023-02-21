import React, { useState } from "react";
import { SignUpForm } from "./sign.up.form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import "../sign.in/sign.in.css";
import { Constants } from "../../constants";
import { signUpAsync } from "../../requests/auth";

export const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { fetchUser, setToken, setAuth } = useActions();
  const submitHandler = (formValues: any) => {
    signUp(formValues).then();
  };

  const signUp = async (formValues: any) => {
    signUpAsync(formValues)
      .then((response) => {
        fetchUser(response.data.id);
        setToken(response.data.token);
        setAuth(true);

        localStorage.setItem(Constants.local.id, response.data.id);
        localStorage.setItem(Constants.local.token, response.data.token);
      })
      .catch((error) => setSignUpError(error.response.data.message));
  };

  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>Sign Up</h1>
        <SignUpForm submit={submitHandler} error={signUpError} />
        <Link to={"/sign-in"} replace={true}>
          Sign In
        </Link>
      </div>
    </div>
  );
};
