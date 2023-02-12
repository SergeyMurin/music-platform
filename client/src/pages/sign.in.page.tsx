import React from "react";
import { SignIn } from "../components/sign.in/sign.in";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";

export const SignInPage: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return (
    <div>
      <SignIn />
      {isAuth && <Navigate to={"../"} />}
    </div>
  );
};
