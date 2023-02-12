import React from "react";
import { SignUp } from "../components/sign.up/sign.up";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";

export const SignUpPage: React.FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return (
    <div>
      <SignUp />
      {isAuth && <Navigate to={"../"} />}
    </div>
  );
};
