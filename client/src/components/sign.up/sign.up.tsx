import React, { useState } from "react";
import { SignUpForm } from "./sign.up.form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import "../sign.in/sign.in.css";

export const SignUp: React.FC = () => {
  const [signUpError, setSignUpError] = useState("");
  const { fetchUser, setToken, setAuth } = useActions();
  const submitHandler = (formValues: any) => {
    signUp(formValues).then();
  };

  const signUp = async (formValues: any) => {
    await axios
      .post("http://localhost:5000/auth/sign-up", {
        ...formValues,
      })
      .then((response) => {
        fetchUser(response.data.id);
        setToken(response.data.token);
        setAuth(true);

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
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
