import React, { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/loader/loader";

export const EmailConfirmPage: React.FC = () => {
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const { fetchUser } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token: string | null = searchParams.get("token");
    if (token && !user?.email_confirmed) {
      confirmEmail(token).then();
    }
  }, [searchParams]);

  const confirmEmail = async (token: string) => {
    await axios
      .get("http://localhost:5000/auth/confirm", {
        params: { token },
      })
      .then(() => {
        fetchUser(user?.id as string);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className={"email-confirm-page color-change-2x"}>
      {isAuth && user?.email_confirmed && (
        <>
          <h1>Email confirmed</h1>
          <Link to={"/"} className={"button"} replace={true}>
            To home
          </Link>
        </>
      )}
      {isAuth && !user?.email_confirmed && (
        <>
          <h1>Confirming email...</h1>
          <Loader />
        </>
      )}
    </div>
  );
};
