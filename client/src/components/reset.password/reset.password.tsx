import React, { useState } from "react";
import { ResetPasswordForm } from "./reset.password.form";
import { Link, useSearchParams } from "react-router-dom";
import { resetPasswordAsync } from "../../requests/requests.auth";

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const onSubmit = (dataValues: any) => {
    const token: string | null = searchParams.get("token");
    if (token) {
      resetPassword(token, dataValues).then();
    }
  };

  const resetPassword = async (token: string, dataValues: any) => {
    resetPasswordAsync(dataValues, token)
      .then(() => {
        setIsUpdated(true);
      })
      .catch((error) => setResetPasswordError(error.response.data.message));
  };
  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        {!isUpdated && (
          <>
            <h1>Reset password</h1>
            <ResetPasswordForm submit={onSubmit} error={resetPasswordError} />
          </>
        )}
        {isUpdated && (
          <div>
            <h1 className={"success"}>Password has been reset</h1>
            <h3>Now you can login</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to={"../sign-in"} className={"button-2"}>
                Sign In
              </Link>
              <Link to={"../"} className={"button-2"}>
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
