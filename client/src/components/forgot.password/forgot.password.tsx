import React, { useState } from "react";
import { ForgotPasswordForm } from "./forgot.password.form";
import { forgotPasswordAsync } from "../../requests/requests.auth";

enum DisplayedText {
  FORGOT = "Forgot password?",
  HEADER = "Enter the email address associated with your account. A confirmation email will be sent to it",
  SENDING = "Sending link to your email",
  SENT = "Reset link has been sent to your email",
}

export const ForgotPassword: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const onSubmit = (values: object) => {
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
        <h1>{DisplayedText.FORGOT}</h1>
        <h3>{DisplayedText.HEADER}</h3>
        <ForgotPasswordForm submit={onSubmit} error={forgotPasswordError} />
        {!isSent && isSubmit && <div>{DisplayedText.SENDING}</div>}
        {isSent && isSubmit && (
          <h4 className={"success"}>{DisplayedText.SENT}</h4>
        )}
      </div>
    </div>
  );
};
