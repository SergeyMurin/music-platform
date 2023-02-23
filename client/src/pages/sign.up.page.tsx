import React from "react";
import { SignUp } from "../components/sign.up/sign.up";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Navigate } from "react-router-dom";
import { ClientConfig } from "../client.config";

export const SignUpPage: React.FC = () => {
  const { isAuth, user } = useTypedSelector((state) => state.user);
  return (
    <>
      {isAuth && user?.email_confirmed && <Navigate to={"../"} />}
      {isAuth && !user?.email_confirmed && (
        <Navigate to={"../" + ClientConfig.client_routes.auth.email} />
      )}
      <SignUp />
    </>
  );
};
