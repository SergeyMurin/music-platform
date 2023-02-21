import React, { useState } from "react";
import { ForgotPasswordForm } from "./forgot.password.form";
import { forgotPasswordAsync } from "../../requests/auth";

export const ForgotPassword: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const onSubmit = (values: {}) => {
    setIsSubmit(true);
    sendResetLink(values).then();
  };

  const sendResetLink = async (dataValues: any) => {
    forgotPasswordAsync(dataValues)
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => setForgotPasswordError(error.response.data.message));
  };

  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>Forgot password?</h1>
        <h3>
          Enter the email address associated with your account. A confirmation
          email will be sent to it
        </h3>
        <ForgotPasswordForm submit={onSubmit} error={forgotPasswordError} />
        {!isSent && isSubmit && <div>Sending link to your email</div>}{" "}
        {isSent && isSubmit && (
          <h4 className={"success"}>Reset link has been sent to your email</h4>
        )}
      </div>
    </div>
  );
};
