import React, { useState } from "react";
import { ResetPasswordForm } from "./reset.password.form";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

export const ResetPassword: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resetPasswordError, setResetPasswordError] = useState("");
  const [isReset, setIsReset] = useState(false);

  const onSubmit = (dataValues: any) => {
    const token: string | null = searchParams.get("token");
    if (token) {
      resetPassword(token, dataValues).then();
    }
  };

  const resetPassword = async (token: string, dataValues: any) => {
    await axios
      .patch(
        "http://localhost:5000/auth/reset-password",
        { password: dataValues?.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsReset(true);
      })
      .catch((error) => setResetPasswordError(error.response.data.message));
  };
  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        {!isReset && (
          <>
            <h1>Reset password</h1>
            <ResetPasswordForm submit={onSubmit} error={resetPasswordError} />
          </>
        )}
        {isReset && (
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
