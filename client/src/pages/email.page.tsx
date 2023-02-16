import React from "react";
import { Link } from "react-router-dom";

export const EmailPage: React.FC = () => {
  return (
    <div className={"email-page color-change-2x"}>
      <h1>
        We have sent a confirmation email to the email address you provided
        during registration. Check your email.
      </h1>
      <h3>This is an optional operation.</h3>

      <Link to={"/"} className={"button"}>
        Home
      </Link>
    </div>
  );
};
