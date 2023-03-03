import React, { useState } from "react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { forgotPasswordAsync } from "../../helpers/requests/authRequests";

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

  const onSubmit = async (values: object) => {
    setIsSubmit(true);
    await sendResetLink(values);
  };

  const sendResetLink = async (dataValues: any) => {
    try {
      const response = await forgotPasswordAsync(dataValues);
      if (response.error) {
        setForgotPasswordError(response.error.response.data.message);
        return;
      }
      setIsSent(true);
    } catch (error) {
      console.error(error);
    }
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
