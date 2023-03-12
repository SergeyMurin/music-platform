import React, { useState } from "react";
import { SignInForm } from "./SignInForm";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import "./SignIn.css";
import { signInAsync } from "../../helpers/requests/authRequests";
import { ClientConfig } from "../../clientConfig";

enum DisplayedText {
  SIGN_IN = "Sign In",
  SIGN_UP = "Sign Up",
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const [signInError, setSignInError] = useState("");
  const {
    fetchUser,
    setToken,
    setAuth,
    fetchUserFavorites,
    fetchUserSubscriptions,
    fetchUserSubscribers,
  } = useActions();

  const onSubmit = async (dataValues: ISignInFormValues) => {
    await signIn(dataValues);
  };

  const signIn = async (dataValues: ISignInFormValues) => {
    const response = await signInAsync(dataValues).catch((error) => {
      setSignInError(error.response.data.message);
    });
    if (!response?.data) return;

    const id = response.data.id;
    const token = response.data.token;

    fetchUser(id);
    setToken(token);
    setAuth(true);
    fetchUserFavorites(id);
    fetchUserSubscribers(id);
    fetchUserSubscriptions(id);

    localStorage.setItem(ClientConfig.local.id, response.data.id);
    localStorage.setItem(ClientConfig.local.token, response.data.token);
  };
  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>{DisplayedText.SIGN_IN}</h1>
        <SignInForm submit={onSubmit} error={signInError} />
        <Link
          to={`../${ClientConfig.client_routes.auth.sign_up}`}
          replace={true}
        >
          {DisplayedText.SIGN_UP}
        </Link>
      </div>
    </div>
  );
};
