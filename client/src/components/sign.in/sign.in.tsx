import React, { useState } from "react";
import { SignInForm } from "./sign.in.form";
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import "./sign.in.css";
import { signInAsync } from "../../requests/requests.auth";
import { Constants } from "../../constants";

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

  const onSubmit = (dataValues: any) => {
    signIn(dataValues).then();
  };

  const signIn = async (dataValues: any) => {
    signInAsync(dataValues)
      .then((response) => {
        const id = response.data.id;
        const token = response.data.token;

        fetchUser(id);
        setToken(token);
        setAuth(true);
        fetchUserFavorites(id);
        fetchUserSubscribers(id);
        fetchUserSubscriptions(id);

        localStorage.setItem(Constants.local.id, response.data.id);
        localStorage.setItem(Constants.local.token, response.data.token);
      })
      .catch((error) => {
        setSignInError(error.response.data.message);
      });
  };
  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>Sign In</h1>

        <SignInForm submit={onSubmit} error={signInError} />
        <Link to={"/sign-up"} replace={true}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};
