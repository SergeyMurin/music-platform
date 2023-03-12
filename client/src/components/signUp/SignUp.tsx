import React, { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import "../signIn/SignIn.css";
import { ClientConfig } from "../../clientConfig";
import { signUpAsync } from "../../helpers/requests/authRequests";

enum displayedText {
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",
}

export interface ISignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

export const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { fetchUser, setToken, setAuth } = useActions();
  const submitHandler = (formValues: ISignUpFormValues) => {
    signUp(formValues).catch((error) => console.error(error));
  };

  const signUp = async (formValues: ISignUpFormValues) => {
    const response = await signUpAsync(formValues).catch((error) => {
      setSignUpError(error.response.data.message);
      return;
    });
    if (!response?.data) return;

    fetchUser(response.data.id);
    setToken(response.data.token);
    setAuth(true);

    localStorage.setItem(ClientConfig.local.id, response.data.id);
    localStorage.setItem(ClientConfig.local.token, response.data.token);
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
