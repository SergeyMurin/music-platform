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
    <>
      {!isReset && (
        <ResetPasswordForm submit={onSubmit} error={resetPasswordError} />
      )}
      {isReset && (
        <div>
          <div>Password has been reset</div>
          <Link to={"../sign-in"}>Sign In</Link>
          <Link to={"../"}>Home</Link>
        </div>
      )}
    </>
  );
};
