import React from "react";
import { Link } from "react-router-dom";

enum DisplayedText {
  HEADER = "We have sent a confirmation email to the email address you provided\n" +
    "        during registration. Check your email.",

  HEADER_3 = "This is an optional operation.",
  HOME = "Home",
}

export const EmailPage: React.FC = () => {
  return (
    <div className={"email-page color-change-2x"}>
      <h1>{DisplayedText.HEADER}</h1>
      <h3>{DisplayedText.HEADER_3}</h3>

      <Link to={"/"} className={"button"}>
        {DisplayedText.HOME}
      </Link>
    </div>
  );
};
