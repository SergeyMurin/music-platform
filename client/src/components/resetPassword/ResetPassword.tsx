import React, { useState } from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Link, useSearchParams } from "react-router-dom";
import { resetPasswordAsync } from "../../helpers/requests/authRequests";
import { ClientConfig } from "../../clientConfig";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

enum DisplayedText {
  RESET = "Reset password",
  HEADER = "Password has been reset",
  LOGIN = "Now you can login",
  SIGN_IN = "Sign In",
  HOME = "Home",
}

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const onSubmit = (dataValues: any) => {
    const token: string | null = searchParams.get("token");
    if (!token) return;
    resetPassword(token, dataValues).catch((error) => console.error(error));
  };

  const resetPassword = async (token: string, dataValues: any) => {
    await resetPasswordAsync(dataValues, token).catch((error) =>
      setResetPasswordError(error.response.data.message)
    );
    setIsUpdated(true);
  };

  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        {!isUpdated && (
          <>
            <h1>{DisplayedText.RESET}</h1>
            <ResetPasswordForm submit={onSubmit} error={resetPasswordError} />
          </>
        )}
        {isUpdated && (
          <div>
            <h1 className={"success"}>{DisplayedText.HEADER}</h1>
            <h3>{DisplayedText.LOGIN}</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link
                to={`../${ClientConfig.client_routes.auth.sign_in}`}
                className={"button-2"}
              >
                {DisplayedText.SIGN_IN}
              </Link>
              <Link to={"/"} className={"button-2"}>
                {DisplayedText.HOME}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
