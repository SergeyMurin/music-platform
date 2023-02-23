import React, { useState } from "react";
import { SignUpForm } from "./sign.up.form";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import "../sign.in/sign.in.css";
import { ClientConfig } from "../../client.config";
import { signUpAsync } from "../../requests/requests.auth";

enum displayedText {
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",
}

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

        localStorage.setItem(ClientConfig.local.id, response.data.id);
        localStorage.setItem(ClientConfig.local.token, response.data.token);
      })
      .catch((error) => setSignUpError(error.response.data.message));
  };

  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>{displayedText.SIGN_UP}</h1>
        <SignUpForm submit={submitHandler} error={signUpError} />
        <Link to={`/${ClientConfig.client_routes.auth.sign_in}`} replace={true}>
          {displayedText.SIGN_IN}
        </Link>
      </div>
    </div>
  );
};
