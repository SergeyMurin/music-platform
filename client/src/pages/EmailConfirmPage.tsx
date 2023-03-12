import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Link, useSearchParams } from "react-router-dom";
import { Loader } from "../components/loader/Loader";
import { confirmEmailAsync } from "../helpers/requests/authRequests";

enum DisplayedText {
  HEADER = "Email confirmed",
  CONFIRMING = "Confirming email...",
  HOME = "To home",
}

enum SearchParams {
  TOKEN = "token",
}

export const EmailConfirmPage: React.FC = () => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const { fetchUser } = useActions();
  const [searchParams] = useSearchParams();

  const confirmEffect = () => {
    const confirmEmail = async (token: string) => {
      await confirmEmailAsync(token);
      fetchUser(user?.id as string);
    };

    const token: string | null = searchParams.get(SearchParams.TOKEN);
    if (token && !user?.email_confirmed) {
      confirmEmail(token).catch((error) => {
        console.error(error);
      });
    }
  };

  useEffect(confirmEffect, [searchParams, user?.email_confirmed, user?.id]);

  return (
    <div className={"email-confirm-page color-change-2x"}>
      {isAuth && user?.email_confirmed && (
        <>
          <h1>{DisplayedText.HEADER}</h1>
          <Link to={"/"} className={"button"} replace={true}>
            {DisplayedText.HOME}
          </Link>
        </>
      )}
      {isAuth && !user?.email_confirmed && (
        <>
          <h1>{DisplayedText.CONFIRMING}</h1>
          <Loader />
        </>
      )}
    </div>
  );
};
