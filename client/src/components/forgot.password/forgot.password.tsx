import React, { useState } from "react";
import { ForgotPasswordForm } from "./forgot.password.form";
import axios from "axios";

export const ForgotPassword: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const onSubmit = (values: {}) => {
    setIsSubmit(true);
    sendResetLink(values).then();
  };

  const sendResetLink = async (values: {}) => {
    await axios
      .post("http://localhost:5000/auth/forgot-password", { ...values })
      .then(() => {
        setIsSent(true);
      })
      .catch((error) => setForgotPasswordError(error.response.data.message));
  };

  return (
    <>
      <ForgotPasswordForm submit={onSubmit} error={forgotPasswordError} />
      {!isSent && isSubmit && <div>Sending link to your email</div>}{" "}
      {isSent && isSubmit && <div>Reset link has been sent to your email</div>}
    </>
  );
};
